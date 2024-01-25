import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const mockIngredients = [
  { name: "cukr", id: "1" },
  { name: "mléko", id: "2" },
  { name: "jin", id: "3" },
  { name: "tonic", id: "45" },
  { name: "voda", id: "86" },
  { name: "rum", id: "46" },
];

function IngredientList() {
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

  return (
    <div>
      <br />
      <div className="card">
        <Toolbar className="mb-4" />
        <DataTable
          //  ref={dt}
          value={mockIngredients}
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
    </div>
  );
}

export default IngredientList;
