import React from "react";
import { Package, Scale, Hash } from "lucide-react";

interface Item {
  item_name: string;
  quantity: number;
  unit: string;
  weight: number;
}

interface ItemsCardListProps {
  items: Item[];
}

const ItemsCardList: React.FC<ItemsCardListProps> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg px-5 py-1 hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {item.item_name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    {item.quantity} {item.unit}
                  </span>
                  <span className="flex items-center gap-1">
                    <Scale className="w-3 h-3" />
                    {item.weight} kg
                  </span>
                </div>
              </div>
            </div>

            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              #{index + 1}
            </span>
          </div>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>Belum ada barang yang ditambahkan</p>
        </div>
      )}
    </div>
  );
};

export default ItemsCardList;
