// creeremo ora un componente per prenotare un tavolo al ristorante
// questo componente sarà dotato di un form nel quale l'utente compilerà
// le informazioni richieste
// una volta completo, il form verrà inviato ad una API tramite chiamata POST

import { Component } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

// I form in React sono SEMPRE C O N T R O L L A T I
// controllato -> i valori dei singoli input field sono SEMPRE salvati in ogni momento nello STATO del componente

// creazione del form:

// name -> string
// phone -> string/number
// numberOfPeople -> string/number
// dateTime -> string
// smoking -> boolean
// specialRequests -> string

// I form in React saranno sempre CONTROLLATI!
// Cosa si intende per input controllato? Un input si definisce "controllato"
// quando è legato allo stato del componente con un "two-way data binding"

// è arrivato il momento di inviare il nostro contenuto del form alle API,
// in modo da salvare persistentemente le prenotazioni che inviamo dal sito

// l'indirizzo che contatteremo è 'https://striveschool-api.herokuapp.com/api/reservation',

const URL = 'https://striveschool-api.herokuapp.com/api/reservation'

// D R Y
// Don't Repeat Yourself

const initialState = {
  name: '', // ho collegato questo valore alla proprietà "value" del campo nome
  phone: '',
  numberOfPeople: '1',
  dateTime: '',
  smoking: false,
  specialRequests: '',
}

class ReservationForm extends Component {
  state = {
    reservation: {
      ...initialState,
    },
  }

  myName = 'Federico'

  handleSubmit = (e) => {
    e.preventDefault() // fermiamo il comportamento di default!
    console.log('ORA INVIO IL FORM')
    // partiamo con la fetch!
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(this.state.reservation), // leggiamo i dati già raccolti!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // finale buono
        if (response.ok) {
          // la chiamata è andata a buon fine
          alert('PRENOTAZIONE SALVATA!')
          // una volta salvata la prenotazione sarebbe da SVUOTARE il form!
          // per svuotare il form, riporto lo state del componente al
          // valore iniziale
          this.setState({
            reservation: {
              ...initialState,
            },
          })
        } else {
          // 500, 400, etc -> la chiamata NON è andata a buon fine
          // ora mi catapulto nel blocco catch
          throw new Error('La chiamata NON è andata a buon fine!')
        }
      })
      .catch((error) => {
        // finale cattivo :(
        console.log('error', error)
        // TODO: gestire meglio l'errore
      })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={6}>
            <div>
              <h2 className="text-center">Prenota un tavolo ORA!</h2>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Il tuo nome</Form.Label>
                <Form.Control
                  required
                  // freccia n.1, collego il valore dell'input allo stato
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    console.log('evento di change', e)
                    // ora devo fare la freccia n.2
                    // devo SETTARE lo stato con il valore inserito nell'input
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        // ho creato una copia identica dell'oggetto reservation
                        // nello state!
                        name: e.target.value,
                      },
                    })
                  }}
                  type="text"
                  placeholder="Mario Rossi"
                />
              </Form.Group>

              {/* Facciamo comparire questo messaggio solamente se l'utente inserisce il nome "Genoveffo" */}

              {this.state.reservation.name.toLowerCase() === 'genoveffo' && (
                <Alert variant="success">Che bel nome!</Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Numero di telefono</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  value={this.state.reservation.phone}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>In quanti siete?</Form.Label>
                <Form.Select
                  aria-label="Table size"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        numberOfPeople: e.target.value,
                      },
                    })
                  }
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Per quando?</Form.Label>
                <Form.Control
                  required
                  type="datetime-local"
                  value={this.state.reservation.dateTime}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        dateTime: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked,
                      },
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergie/Cani/Bambini?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={this.state.reservation.specialRequests}
                  onChange={(e) =>
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    })
                  }
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Invia prenotazione
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationForm
