import React from "react";
import {
  FaFileInvoice,
  FaUsers,
  FaBuilding,
  FaBook,
  FaTags,
  FaCopy,
  FaExclamationCircle,
  FaGift,
  FaBoxes,
  FaUserTie,
  FaExchangeAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const menuItems = [
  { key: "invoices", label: "Invoices", icon: <FaFileInvoice /> },
  { key: "customers", label: "Customers", icon: <FaUsers /> },
  { key: "business", label: "My Business", icon: <FaBuilding /> },
  { key: "journal", label: "Invoice Journal", icon: <FaBook /> },
  { key: "price", label: "Price List", icon: <FaTags /> },
  { key: "multi", label: "Multiple Invoicing", icon: <FaCopy /> },
  { key: "unpaid", label: "Unpaid Invoices", icon: <FaExclamationCircle /> },
  { key: "offer", label: "Offer", icon: <FaGift /> },
  { key: "inventory", label: "Inventory Control", icon: <FaBoxes /> },
  { key: "member", label: "Member Invoicing", icon: <FaUserTie /> },
  { key: "import", label: "Import/Export", icon: <FaExchangeAlt /> },
  { key: "logout", label: "Log out", icon: <FaSignOutAlt /> },
];

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeItem = "price",
  onItemClick 
}) {

  const handleItemClick = (itemKey) => {
    if (onItemClick) {
      onItemClick(itemKey);
    }
    
    if (window.innerWidth <= 1270 && onClose) {
      onClose();
    }
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h3 className="menuTitle">Menu</h3>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={activeItem === item.key ? "active" : ""}
              onClick={() => handleItemClick(item.key)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}