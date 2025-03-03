import Title from "../../components/Atom/Title";
import Form from "../../components/Molecule/Form";

function AddDeliveryPages() {
  return (
    <>
      <Title title={"Tambah Pengiriman"} />
      <form className="w-1/2">
        <Form label={"Nama"} type="number" placeholder={'nama'}/>
        <Form label={"Alamat"} />
        <Form label={"cihuy"} type="number" />
      </form>
    </>
  );
}

export default AddDeliveryPages;
