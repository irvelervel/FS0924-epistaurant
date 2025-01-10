// questo componente si occuperà di recuperare la lista delle prenotazioni esistenti nel nostro ristorante e di compilare una <ul> in bootstrap

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

// ogni volta che un componente deve recuperare dati da una API, ha bisogno di uno stato! -> creeremo AdminSection come componente a CLASSE

// quando intendente recuperare dati da una API in un componente, dovete all'interno dello stato predisporre un posticino per ospitarli!

class AdminSection extends Component {
  state = {
    reservations: [], // inizializzo reservations come array vuoto in quanto intendo preservare il TIPO del dato; questa proprietà sarà SEMPRE un array, nel caso peggiore rimarrà vuoto oppure si riempirà di n elementi
  }

  render() {
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
