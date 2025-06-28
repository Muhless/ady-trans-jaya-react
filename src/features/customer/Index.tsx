import React, { useEffect, useState } from "react";
import Title from "../../components/Title.js";
import ButtonComponent from "../../components/button/Index";
import TableComponent from "../../components/table/index";
import Card from "../../components/card/index";
import Modal from "../../components/modal/Modal";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCustomer,
  deleteCustomer,
  fetchCustomers,
} from "../../api/customer";
import Spinner from "@/components/Spinner.js";
import SearchInput from "@/components/input/Search.js";
import AddCustomerForm from "@/components/form/AddCustomerForm.js";
import useNavigationHooks from "@/hooks/useNavigation.js";
import { id } from "date-fns/locale";

const modalInput = [
  { name: "name", label: "Nama", type: "text" },
  { name: "company", label: "Perusahaan", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Nomor HP", type: "number" },
  { name: "address", label: "Alamat", type: "textarea" },
];

interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { goToCustomerDetailPages } = useNavigationHooks();

  useEffect(() => {
    const fetchCustomersData = async () => {
      try {
        const data = await fetchCustomers();
        if (!Array.isArray(data)) {
          throw new Error("Gagal mengambil data pelanggan");
        }
        setCustomers(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat mengambil data pelanggan"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCustomersData();
  }, []);

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const newCustomer = await addCustomer(data);
      setCustomers((prev) => [...prev, newCustomer]);
      setModalOpen(false);
    } catch (error: any) {
      console.error("Gagal menyimpan data:", error);
      setError(error.message || "Gagal menyimpan data pelanggan");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <Title title={"Pelanggan"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Pelanggan"
          variant="add"
          className="w-48"
          onClick={() => setModalOpen(true)}
        />
        <SearchInput placeholder="pelanggan..." />
      </div>
      {loading ? (
        <div className="text-center p-5">Loading</div>
      ) : error ? (
        <div className="text-center text-red-600 p-5">Error loading data</div>
      ) : (
        <TableComponent
          classNameTH="p-3"
          classNameTD="p-4"
          data={customers}
          columns={[
            { key: "name", label: "Nama" },
            { key: "company", label: "Perusahaan" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Nomor Telepon" },
            { key: "address", label: "Alamat" },
          ]}
          onRowClick={(row) => goToCustomerDetailPages(row.id)}
        />
      )}
      <Modal
        title="Customer"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <AddCustomerForm onSubmit={handleSubmit} />
      </Modal>
    </>
  );
}

export default CustomerPages;
