import { Carousel, Container, Row, Col } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
// pastasciutte è un array di oggetti!

const HomeContent = function () {
  return (
    <Container>
      <Row className="justify-content-center">
        {/* colonna con classi settate "a mano" */}
        {/* <Col className="col-12 col-md-6 col-lg-4"> */}
        <Col xs={12} lg={6}>
          <Carousel>
            {/* in React .map si usa per generare dinamicamente del contenuto */}
            {pastasciutte.map((pasta, i) => {
              // quante volte entro qui dentro?
              // entro 5 volte!
              return (
                // la key va inserita obbligatoriamente nell'elemento ritornato
                // dal map, deve essere un valore univoco per ogni elemento
                // generato!
                <Carousel.Item key={i}>
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
    </Container>
  )
}

export default HomeContent
