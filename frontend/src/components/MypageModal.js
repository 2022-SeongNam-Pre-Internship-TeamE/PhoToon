import ButtonThree from '../components/ButtonThree';
import Modal from 'react-bootstrap/Modal';
import Slide from "./Slide";


function MypageModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      임시 이미지 삽입하였습니다.
      </Modal.Header>
      
      <Modal.Body >
      <closeButton/>
        {/* 임시로 사진 넣음 */}
        <div style={{textAlign: 'center'}}>
          
      <Slide img="images/ice-1.jpg" ></Slide>
      </div>
        <ButtonThree ></ButtonThree>

      </Modal.Body>
    </Modal>
  );
}
export default MypageModal;
