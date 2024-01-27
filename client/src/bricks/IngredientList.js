import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

function IngredientList() {
  const [newIngredientDialog, setNewIngredientDialog] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/ingredients/`, {
      method: "GET",
    }).then(async (response) => {
      const serverIngredientsList = await response.json();
      setIngredientsList(serverIngredientsList);
      // console.log(ingredientsList);
      // console.log(response);
      console.log(serverIngredientsList);
    });
  }, []);

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={<FontAwesomeIcon icon={faPencil} />}
          rounded
          outlined
          className="mr-2"
          severity="info"
          //  onClick={() => editIngredient(rowData)}
        />
        <Button
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          rounded
          outlined
          severity="danger"
          //  onClick={() => confirmDeleteIngredient(rowData)}
        />
      </React.Fragment>
    );
  };

  const toolbarEnd = () => {
    return (
      <Button onClick={() => setNewIngredientDialog(true)}>
        Add new ingredient
      </Button>
    );
  };

  const addIngredient = () => {};

  const newIngredientDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setNewIngredientDialog(false)}
        style={{ marginRight: "10px", backgroundColor: "grey" }}
      >
        Cancel
      </Button>
      <Button
        onClick={addIngredient}
        style={{ marginRight: "10px", backgroundColor: "red" }}
      >
        Add
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      <br />
      <div className="card">
        <Toolbar className="mb-4" end={toolbarEnd} />
        <DataTable
          //  ref={dt}
          value={ingredientsList}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Show from {first} to {last} from total of {totalRecords} ingredients"
          // globalFilter={globalFilter}
          // header={header}
        >
          <Column
            field="id"
            header="ID - není potřeba zobrazovat..."
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "12rem" }}
          ></Column>
        </DataTable>
      </div>

      <Modal
        show={newIngredientDialog}
        onHide={() => setNewIngredientDialog(false)}
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new ingredient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              // value={formData.name}
              // onChange={(e) => setField("procedure", e.target.value)}
              maxLength={25}
              required
            />
            <Form.Control.Feedback type="invalid">
              Write from 1 to 25 characters
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>{newIngredientDialogFooter}</Modal.Footer>
      </Modal>
    </div>
  );
}

export default IngredientList;
