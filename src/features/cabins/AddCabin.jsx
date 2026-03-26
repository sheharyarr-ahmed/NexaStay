import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

const Actions = styled.div`
  display: grid;
  gap: 1.2rem;
`;

function AddCabin() {
  return (
    <Modal>
      <Actions>
        <Modal.Open opens="cabin-form">
          <Button style={{ width: "100%" }}>Add new cabin</Button>
        </Modal.Open>
        <Modal.Open opens="cabin-table">
          <Button style={{ width: "100%" }} variation="secondary">
            Show table
          </Button>
        </Modal.Open>
      </Actions>

      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      <Modal.Window name="cabin-table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
