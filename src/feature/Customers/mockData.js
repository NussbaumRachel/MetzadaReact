// mockData.js

export const customersMock = [
  { id: 1, name: "לקוח 1", phone: "0500000001", email: "c1@test.com" },
  { id: 2, name: "לקוח 2", phone: "0500000002", email: "c2@test.com" },
  { id: 3, name: "לקוח 3", phone: "0500000003", email: "c3@test.com" },
  { id: 4, name: "לקוח 4", phone: "0500000004", email: "c4@test.com" },
  { id: 5, name: "לקוח 5", phone: "0500000005", email: "c5@test.com" }
];

export const ordersMock = [
  {
    id: 101,
    custId: 1,
    custName: "לקוח 1",
    deliveryDate: "2026-05-01",
    status: "פתוחה",
    price: 1200
  },
  {
    id: 102,
    custId: 1,
    custName: "לקוח 1",
    deliveryDate: "2026-05-10",
    status: "בתהליך",
    price: 2500
  },
  {
    id: 103,
    custId: 2,
    custName: "לקוח 2",
    deliveryDate: "2026-04-28",
    status: "הושלמה",
    price: 900
  },
  {
    id: 104,
    custId: 3,
    custName: "לקוח 3",
    deliveryDate: "2026-05-03",
    status: "פתוחה",
    price: 1800
  },
  {
    id: 105,
    custId: 4,
    custName: "לקוח 4",
    deliveryDate: "2026-05-07",
    status: "בתהליך",
    price: 3200
  }
];