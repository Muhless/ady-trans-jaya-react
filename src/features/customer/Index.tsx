import React, { useState } from "react";
import SearchInput from "../../components/input/Search.tsx";
import Title from "../../components/Title.js";
import ButtonComponent from "../../components/button/Index.tsx";
import TableComponent from "../../components/table/index.tsx";
import Card from "../../components/card/index.tsx";
import Modal from "../../components/modal/Modal.tsx";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

const fetchCustomers = async () => {
  const res = await axios.get("http://localhost:8080/api/customers");
  return res.data.data;
};

function CustomerPages() {
  const [modalOpen, setModalOpen] = useState(false);
  const [customer, setCustomers] = useState<Customer[]>([]);
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });

  const handleRowClick = (row: any) => {
    console.log("Row Clicked", row);
  };

  const handleSumbitCustomers = async (data: Record<string, any>) => {
    try {
      const response = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Gagal menyimpan data");
      }
      const result = await response.json();
      const newCustomer = result.message?.[0];
      console.log("Berhasil menyimpan data Customer", newCustomer);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setModalOpen(false);
    } catch (error) {
      console.log("Gagal menyimpan data:", error);
      setError(error.message);
    }
  };

  return (
    <>
      <Title title={"Customer"} />
      <div className="flex justify-between mb-5">
        <ButtonComponent
          label="Tambah Customer"
          variant="add"
          className="w-48"
          onClick={() => setModalOpen(true)}
        />
        <SearchInput placeholder="customer" />
      </div>
      <Card>
        {isLoading ? (
          <div className="text-center p-5">Loading</div>
        ) : isError ? (
          <div className="text-center text-red-600 p-5">Error loading data</div>
        ) : (
          <TableComponent
            data={Array.isArray(customer) ? customers : customers?.data ?? []}
            onRowClick={handleRowClick}
            showActions={true}
          />
        )}
      </Card>
      <Modal
        title="Customer"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        fields={modalInput}
        onSubmit={handleSumbitCustomers}
      />
    </>
  );
}

export default CustomerPages;
