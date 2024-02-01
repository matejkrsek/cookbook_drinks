import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "primereact/dialog";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

function IngredientList() {
  let emptyIngredient = { name: "", id: "" };

  const [addIngredientForm, setAddIngredientForm] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [deleteIngredientDialog, setDeleteIngredientDialog] = useState(false);
  const [ingredient, setIngredient] = useState(emptyIngredient);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    role: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/api/ingredients/`, {
      method: "GET",
    }).then(async (response) => {
      const serverIngredientsList = await response.json();
      setIngredientsList(serverIngredientsList);
      // console.log(ingredientsList);
      // console.log(response);
      //console.log(serverIngredientsList);
    });
  }, []);

  const confirmDeleteIngredient = (data) => {
    setIngredient(data);
    setDeleteIngredientDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          style={{ borderRadius: "5px" }}
          outlined
          severity="danger"
          onClick={() => confirmDeleteIngredient(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // Add this line to vertically center the content
        backgroundColor: "lightyellow",
        flexDirection: "column", // Add this line to stack the children vertically
        textAlign: "center", // Add this line to center the text horizontally
        paddingTop: "10px",
      }}
    >
      <h4 className="m-0 mb-3">
        Here you can see and add ingredients of our drinks!
      </h4>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <Button
            severity="success"
            onClick={() => setAddIngredientForm(true)}
            style={{
              marginRight: "10px",
              height: "40px",
              borderRadius: "5px",
            }}
          >
            Add new ingredient
          </Button>
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    </div>
  );

  function deleteIngredient(ingredientID) {
    setDeleteIngredientDialog(false);
    return fetch(`http://localhost:3001/api/ingredients/${ingredientID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async () => {
      const updatedIngredientsList = ingredientsList.filter(
        (ingredient) => ingredient.id !== ingredientID
      );
      setIngredientsList(updatedIngredientsList);
    });
  }
  const newIngredientDialogFooter = (
    <React.Fragment>
      <Button
        onClick={() => setAddIngredientForm(false)}
        severity="secondary"
        style={{ borderRadius: "5px" }}
      >
        Cancel
      </Button>
    </React.Fragment>
  );

  const deleteIngredientDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        onClick={() => setDeleteIngredientDialog(false)}
        severity="secondary"
        style={{ marginRight: "7px", borderRadius: "5px" }}
      />
      <Button
        label="Yes"
        severity="danger"
        onClick={() => deleteIngredient(ingredient.id)}
        style={{ borderRadius: "5px" }}
      />
    </React.Fragment>
  );

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    // defaultní nastavení Form je, že když je provedeno onSubmit, reloadne se celá page, to nechceme, takže proto preventDefault

    // příklad: využití: https://react.dev/learn/responding-to-events

    //data z vyplněného formuláře, která se odesílají na server
    const dataToServer = {
      ...formData,
    };
    // form je současný vstup uživatele, checkValidity se dívá na podmínky stanovené v jednotlibých Form.Control,
    // jako např. required, maxLength, min, max atd. a vyhodnocuje, zda je celý vstup validní... pak vrací true
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // ukládáme přidanou známku na server -- ternární operátor nám na základě existence grade nastaví call na /update nebo / create

    await fetch(`http://localhost:3001/api/ingredients/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToServer),
    }).then(async (response) => {
      const responseJson = await response.json();
      ingredientsList.push(responseJson);
    });
  };

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };

      // If the field is within the ingredients array
      if (name.startsWith("ingredients")) {
        const ingredientsIndex = parseInt(name.match(/\[(\d+)\]/)[1], 10);

        // Make a copy of the ingredients array and update the specific element
        newData.ingredients = [...newData.ingredients];
        newData.ingredients[ingredientsIndex] = {
          ...newData.ingredients[ingredientsIndex],
          [name.split(".").pop()]: val,
        };
      } else {
        newData[name] = val;
      }

      return newData;
    });
  };

  return (
    <div>
      <DataTable
        value={ingredientsList}
        size="small"
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Show from {first} to {last} from total of {totalRecords} ingredients"
        header={header}
        filters={filters}
        filterDisplay="row"
        stripedRows
        globalFilter={globalFilter}
      >
        <Column></Column>
        <Column></Column>
        <Column></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column body={actionBodyTemplate} exportable={false}></Column>
      </DataTable>

      <Modal
        show={addIngredientForm}
        onHide={() => setAddIngredientForm(false)}
        size="md"
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new ingredient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setField("name", e.target.value.toLocaleLowerCase().trim())
                }
                maxLength={25}
                required
              />
              <Form.Control.Feedback type="invalid">
                Write from 1 to 25 characters
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {newIngredientDialogFooter}
            <Button
              severity="success"
              style={{ marginRight: "10px", borderRadius: "5px" }}
              type="submit"
            >
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Dialog
        visible={deleteIngredientDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirmation"
        modal
        footer={deleteIngredientDialogFooter}
        onHide={() => setDeleteIngredientDialog(false)}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />

          <span>
            Do you really want to delete <b>{ingredient.name}</b>?
          </span>
        </div>
      </Dialog>
    </div>
  );
}

export default IngredientList;
