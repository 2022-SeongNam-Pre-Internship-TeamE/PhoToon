import MypageModal from '../components/MypageModal';
import React from "react";
import Button from 'react-bootstrap/Button';

export default function  Mypage() {
      const [modalShow, setModalShow] = React.useState(false);
    
      return (
        <>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
          </Button>
    
          <MypageModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      );
    }