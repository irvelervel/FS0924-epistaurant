// questo componente si occuperà di recuperare la lista delle prenotazioni esistenti nel nostro ristorante e di compilare una <ul> in bootstrap

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

// ogni volta che un componente deve recuperare dati da una API, ha bisogno di uno stato! -> creeremo AdminSection come componente a CLASSE

// quando intendente recuperare dati da una API in un componente, dovete all'interno dello stato predisporre un posticino per ospitarli!

const URL = 'https://striveschool-api.herokuapp.com/api/reservation'

class AdminSection extends Component {
  state = {
    reservations: [], // inizializzo reservations come array vuoto in quanto intendo preservare il TIPO del dato; questa proprietà sarà SEMPRE un array, nel caso peggiore rimarrà vuoto oppure si riempirà di n elementi
  }

  getReservationsThenCatch = () => {
    // questa funzione si occuperà di recuperare le prenotazioni e di salvarle nello stato del componente; una volta fatto questo, l'interfaccia riempirà la lista delle prenotazioni automaticamente, perchè è già istruita a ciclare l'array reservations nello stato e a creare un elemento di lista per ognuno degli oggetti al suo interno
    fetch(URL)
      .then((response) => {
        // finale buono
        if (response.ok) {
          // siamo sicuri che i dati sono arrivati
          // visto che a noi in questo caso interessa ottenere il JSON
          // delle Response ottenuta, invochiamo il metodo .json() di JavaScript che ci restituirà il contenuto della Response
          return response.json()
        } else {
          // c'è stato un problema nella chiamata
          throw new Error('Errore nella chiamata API')
        }
      })

      .then((data) => {
        // finale buono dell'estrazione del JSON
        // data sarà l'array delle prenotazioni!
        console.log('DATA', data)
      })
      .catch((error) => {
        // finale cattivo
        // c'è stato un problema di connessione, internet, etc.
        console.log('ERRORE', error)
      })
  }

  getReservationsAsyncAwait = async () => {
    try {
      const response = await fetch(URL)
      if (response.ok) {
        const data = await response.json()
        console.log('DATA', data)
        // ora che ho ottenuto l'array delle prenotazioni (data),
        // vado a farci un setState in modo da riempire l'array vuoto
        // chiamato "reservations" all'interno dello stato
        this.setState({
          reservations: data,
        })
      } else {
        throw new Error('Errore nel recupero dati API')
      }
    } catch (error) {
      console.log('ERRORE', error)
    }
  }

  render() {
    this.getReservationsAsyncAwait()
    return (
      <Container>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={6}>
            <div>
              <h2 className="text-center">Prenotazioni esistenti</h2>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={6}>
            <ListGroup>
              {this.state.reservations.map((res) => {
                return (
                  <ListGroup.Item key={res._id}>
                    {res.name} per {res.numberOfPeople}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AdminSection
