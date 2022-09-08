import ButtonThree from '../components/ButtonThree';
import Modal from 'react-bootstrap/Modal';

function MypageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        
        <ButtonThree text="Delete"></ButtonThree>
        
        
        {/* <MainButton text="Delete"></MainButton>
        
        <MainButton text="Delete"></MainButton> */}
        
        
      </Modal.Body>
    </Modal>
  );
}
export default MypageModal;
