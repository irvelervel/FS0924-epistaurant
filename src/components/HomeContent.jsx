import { Carousel, Container, Row, Col, ListGroup } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { Component } from 'react'
// pastasciutte è un array di oggetti!

// ho bisogno di uno stato per memorizzare nel componente quale sia
// la PASTA ATTIVA
// per avere un oggetto di stato, ho bisogno di un componente a CLASSE

class HomeContent extends Component {
  state = {
    activePasta: pastasciutte[0], // oggetto della pasta carbonara
  }
  // state è sempre un oggetto!

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          {/* colonna con classi settate "a mano" */}
          {/* <Col className="col-12 col-md-6 col-lg-4"> */}
          <Col xs={12} md={6}>
            <Carousel
              onSlide={(i) => {
                console.log('SLIDE CAMBIATA!', i)
                // pastasciutte[i] è la nuova pasta che deve prendere il posto
                // della corrente activePasta
                this.setState({
                  activePasta: pastasciutte[i],
                })
              }}
            >
              {/* in React .map si usa per generare dinamicamente del contenuto */}
              {pastasciutte.map((pasta) => {
                // quante volte entro qui dentro?
                // entro 5 volte!
                return (
                  // la key va inserita obbligatoriamente nell'elemento ritornato
                  // dal map, deve essere un valore univoco per ogni elemento
                  // generato!
                  <Carousel.Item key={pasta.id}>
                    <img src={pasta.image} className="w-100" />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <ListGroup className="text-center">
              {this.state.activePasta.comments.map((r) => {
                return <ListGroup.Item key={r.id}>{r.comment}</ListGroup.Item>
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HomeContent
