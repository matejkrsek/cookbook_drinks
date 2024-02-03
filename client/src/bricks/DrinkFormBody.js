import { Button } from "primereact/button";
import { Col, Form, Modal, Row } from "react-bootstrap";

function DrinkFormBody(props) {
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>{props.type} recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={props.formData.name}
            onChange={(e) => props.setField("name", e.target.value)}
            maxLength={30}
            required
          />
          <Form.Control.Feedback type="invalid">
            Write from 1 to 25 characters
          </Form.Control.Feedback>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={props.formData.author}
                onChange={(e) => props.setField("author", e.target.value)}
                maxLength={30}
                required
              />
              <Form.Control.Feedback type="invalid">
                Write from 1 to 25 characters
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={props.formData.type}
                onChange={(e) => props.setField("type", e.target.value)}
                required
              >
                <option value="" disabled>
                  Type
                </option>
                <option value={"short"}>short</option>
                <option value={"long"}>long</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Label>Procedure</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            value={props.formData.procedure}
            onChange={(e) => props.setField("procedure", e.target.value)}
            maxLength={500}
            required
          />
          <Form.Control.Feedback type="invalid">
            Write from 1 to 25 characters
          </Form.Control.Feedback>
        </Form.Group>
        {[...Array(6)].map((_, index) => (
          <Row key={index}>
            <Form.Group as={Col}>
              <Form.Label>
                Ingredient
                {index === 0 || index === 1 ? (
                  <span className="required-label"> (required)</span>
                ) : (
                  ""
                )}
              </Form.Label>
              <Form.Select
                type="text"
                value={props.formData.ingredients[index].name}
                onChange={(e) =>
                  props.setField(`ingredients[${index}].name`, e.target.value)
                }
                required={index === 0 || index === 1}
              >
                <option value="">Select an ingredient</option>
                {props.ingredientsList.map((ingredient) => (
                  <option key={ingredient.id} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={
                  props.formData.ingredients[index].name === ""
                    ? ""
                    : props.formData.ingredients[index].amount
                }
                onChange={(e) =>
                  props.setField(
                    `ingredients[${index}].amount`,
                    Math.max(0, e.target.value)
                  )
                }
                required={index === 0 || index === 1}
                min="0"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Unit</Form.Label>
              <Form.Select
                value={
                  props.formData.ingredients[index].name === ""
                    ? 0
                    : props.formData.ingredients[index].unit
                }
                onChange={(e) =>
                  props.setField(`ingredients[${index}].unit`, e.target.value)
                }
                required={
                  index === 0 ||
                  index === 1 ||
                  //  props.formData.ingredients[index].amount !== 0 ||
                  props.formData.ingredients[index].name !== ""
                } // Nastaví required pro index 0 a 1
              >
                <option value="">Unit</option>
                <option value={"g"}>g</option>
                <option value={"pinch"}>pinch</option>
                <option value={"teaspoon"}>teaspoon</option>
                <option value={"ml"}>ml</option>
                <option value={"cube"}>cube</option>
                <option value={"slice"}>slice</option>
                <option value={"dash"}>dash</option>
                <option value={"tablespoon"}>tablespoon</option>
                <option value={"splash"}>splash</option>
              </Form.Select>
            </Form.Group>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row justify-content-between align-items-center w-100">
          <div className="d-flex flex-row gap-2">
            <Button
              severity="secondary"
              onClick={() => props.closeFunction()}
              style={{ borderRadius: "5px" }}
            >
              Close
            </Button>
            <Button
              severity="success"
              type="submit"
              style={{ borderRadius: "5px" }}
            >
              {props.type}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default DrinkFormBody;
