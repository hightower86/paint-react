import React, { useState } from "react";
import Modal from "./Modal";

interface Props {}

const About = (props: Props) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => {
    setModalOpened((prev) => !prev);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-4xl">About</h1>
      <button className="btn btn-primary" onClick={toggleModal}>
        click
      </button>
      <Modal open={modalOpened}>
        <h3 className="font-bold text-lg">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You havve been selected for a chance to get one year of subscription
          to use Wikipedia for free!
        </p>
        <div className="modal-action">
          <label className="btn btn-primary" onClick={toggleModal}>
            Yay!
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default About;
