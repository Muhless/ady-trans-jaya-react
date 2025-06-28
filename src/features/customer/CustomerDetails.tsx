import { fetchCustomerById } from "@/api/customer";
import TransactionTable from "@/components/table/TransactionTable";
import TitleComponent from "@/components/Title";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  User,
  ArrowLeft,
  Clock,
  AlertCircle,
} from "lucide-react";
import ButtonComponent from "@/components/button/Index";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: string;
};

const CustomerDetailPages = () => {
  const { id } = useParams();

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomerById(Number(id)),
    enabled: !!id,
  });

  const customerId = parseInt(id || "0");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-36"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-red-600 mb-6">
              Gagal memuat data pelanggan. Silakan coba lagi.
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-gradient-to-r from-sidebar to-blue-800 text-white rounded-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <TitleComponent title="Detail Pelanggan" />
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-500/20 rounded-full p-4">
                <User className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8">
        {customer ? (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 -mt-4 relative z-10">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {customer.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        ID Pelanggan #{customerId}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2"> 
                    <ButtonComponent variant="edit" className="p-3"/>
                    <ButtonComponent variant="delete" className="p-3"/>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500">
                          Email
                        </p>
                        <p className="text-gray-900 truncate">
                          {customer.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-500">
                          Nomor Telepon
                        </p>
                        <p className="text-gray-900">{customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {customer.company && (
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500">
                            Perusahaan
                          </p>
                          <p className="text-gray-900">{customer.company}</p>
                        </div>
                      </div>
                    )}

                    {customer.address && (
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <MapPin className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-500">
                            Alamat
                          </p>
                          <p className="text-gray-900">{customer.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Riwayat Transaksi
                    </h3>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <TransactionTable
                  classNameTH="p-4 text-xs font-medium uppercase tracking-wider bg-gray-50"
                  classNameTD="p-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100"
                  filters={{ customer_id: customerId }}
                  showActions={false}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Pelanggan Tidak Ditemukan
            </h2>
            <p className="text-gray-600 mb-6">
              Data pelanggan dengan ID tersebut tidak dapat ditemukan.
            </p>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailPages;
