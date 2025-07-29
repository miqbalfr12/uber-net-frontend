export const menuOwner = [
 {
  type: "link",
  href: "/owner",
  content: "Dashboard",
  icon: "LayoutDashboardIcon",
 },
 {
  type: "text",
  content: "MENU UTAMA",
 },

 {
  type: "link",
  href: "/owner/data-pendapatan",
  content: "Pendapatan",
  icon: "LayersIcon",
 },
 {
  type: "link",
  href: "/owner/laporan",
  content: "Laporan",
  icon: "BookMarkedIcon",
 },
 {
  type: "text",
  content: "USER",
 },
 {
  type: "link",
  href: "/logout",
  content: "Keluar",
  icon: "PowerIcon",
 },
];
export const menuAdmin = [
 {
  type: "link",
  href: "/admin",
  content: "Dashboard",
  icon: "LayoutDashboardIcon",
 },
 {
  type: "text",
  content: "MENU UTAMA",
 },
 {
  type: "dropdown",
  content: "Data",
  icon: "LayersIcon",
  items: [
   {
    type: "link",
    href: "/admin/list-admin",
    content: "Admin",
   },
   {
    type: "link",
    href: "/admin/list-pelanggan",
    content: "Pelanggan",
   },
   {
    type: "link",
    href: "/admin/data-tagihan",
    content: "Tagihan",
   },
  ],
 },
 {
  type: "text",
  content: "USER",
 },
 {
  type: "link",
  href: "/logout",
  content: "Keluar",
  icon: "PowerIcon",
 },
];
export const menuPelanggan = [
 {
  type: "link",
  href: "/owner",
  content: "Dashboard",
  icon: "LayoutDashboardIcon",
 },

 {
  type: "text",
  content: "USER",
 },
 {
  type: "link",
  href: "/logout",
  content: "Keluar",
  icon: "PowerIcon",
 },
];
// export const menuSuperAdmin = [
//  {
//   type: "link",
//   href: "/super-admin",
//   content: "Dashboard",
//   icon: "LayoutDashboardIcon",
//  },
//  {
//   type: "text",
//   content: "MENU UTAMA",
//  },
//  {
//   type: "dropdown",
//   content: "Pengaturan",
//   icon: "SettingsIcon",
//   items: [
//    //    {
//    //     type: "link",
//    //     href: "/super-admin/lembaga",
//    //     content: "Lembaga",
//    //    },
//    //    {
//    //     type: "link",
//    //     href: "/super-admin/list-jabatan",
//    //     content: "Jabatan",
//    //    },
//    {
//     type: "link",
//     href: "/super-admin/list-users",
//     content: "Users",
//    },
//   ],
//  },
//  //  {
//  //   type: "dropdown",
//  //   content: "Persuratan",
//  //   icon: "LayersIcon",
//  //   items: [
//  //    {
//  //     type: "link",
//  //     href: "/super-admin/list-surat-masuk",
//  //     content: "Surat Masuk",
//  //    },
//  //    {
//  //     type: "link",
//  //     href: "/super-admin/list-surat-keluar",
//  //     content: "Surat Keluar",
//  //    },
//  //   ],
//  //  },
//  //  {
//  //   type: "link",
//  //   href: "/super-admin/laporan",
//  //   content: "Laporan",
//  //   icon: "BookMarkedIcon",
//  //  },
//  {
//   type: "text",
//   content: "USER",
//  },
//  {
//   type: "link",
//   href: "/logout",
//   content: "Keluar",
//   icon: "PowerIcon",
//  },
// ];
// export const menuAdminSubag = [
//  {
//   type: "link",
//   href: "/admin-subag",
//   content: "Dashboard",
//   icon: "LayoutDashboardIcon",
//  },
//  {
//   type: "text",
//   content: "MENU UTAMA",
//  },
//  {
//   type: "dropdown",
//   content: "Persuratan",
//   icon: "LayersIcon",
//   items: [
//    {
//     type: "link",
//     href: "/admin-subag/list-surat-masuk",
//     content: "Surat Masuk",
//    },
//    {
//     type: "link",
//     href: "/admin-subag/list-surat-keluar",
//     content: "Surat Keluar",
//    },
//   ],
//  },
//  {
//   type: "text",
//   content: "USER",
//  },
//  {
//   type: "link",
//   href: "/logout",
//   content: "Keluar",
//   icon: "PowerIcon",
//  },
// ];
// export const menuKepalaSatker = [
//  {
//   type: "link",
//   href: "/kepala-satker",
//   content: "Dashboard",
//   icon: "LayoutDashboardIcon",
//  },
//  {
//   type: "text",
//   content: "MENU UTAMA",
//  },
//  {
//   type: "dropdown",
//   content: "Persuratan",
//   icon: "LayersIcon",
//   items: [
//    {
//     type: "link",
//     href: "/kepala-satker/validasi-disposisi-surat-masuk",
//     content: "Validasi/Disposisi Surat Masuk",
//    },
//    {
//     type: "link",
//     href: "/kepala-satker/validasi-disposisi-surat-keluar",
//     content: "Validasi/Disposisi Surat Keluar",
//    },
//   ],
//  },
//  //  {
//  //   type: "link",
//  //   href: "/kepala-satker/laporan",
//  //   content: "Laporan",
//  //   icon: "BookMarkedIcon",
//  //  },
//  {
//   type: "text",
//   content: "USER",
//  },
//  {
//   type: "link",
//   href: "/logout",
//   content: "Keluar",
//   icon: "PowerIcon",
//  },
// ];
// export const menuKepalaSubag = [
//  {
//   type: "link",
//   href: "/kepala-subag",
//   content: "Dashboard",
//   icon: "LayoutDashboardIcon",
//  },
//  {
//   type: "text",
//   content: "MENU UTAMA",
//  },
//  {
//   type: "dropdown",
//   content: "Persuratan",
//   icon: "LayersIcon",
//   items: [
//    {
//     type: "link",
//     href: "/kepala-subag/list-surat-masuk",
//     content: "Surat Masuk",
//    },
//    {
//     type: "link",
//     href: "/kepala-subag/list-surat-keluar",
//     content: "Surat Keluar",
//    },
//   ],
//  },
//  //  {
//  //   type: "link",
//  //   href: "/kepala-subag/laporan",
//  //   content: "Laporan",
//  //   icon: "BookMarkedIcon",
//  //  },
//  {
//   type: "text",
//   content: "USER",
//  },
//  {
//   type: "link",
//   href: "/logout",
//   content: "Keluar",
//   icon: "PowerIcon",
//  },
// ];
// export const menuPegawai = [
//  {
//   type: "link",
//   href: "/pegawai",
//   content: "Dashboard",
//   icon: "LayoutDashboardIcon",
//  },
//  {
//   type: "text",
//   content: "MENU UTAMA",
//  },
//  {
//   type: "dropdown",
//   content: "Persuratan",
//   icon: "LayersIcon",
//   items: [
//    {
//     type: "link",
//     href: "/pegawai/list-surat-masuk",
//     content: "Surat Masuk",
//    },
//    {
//     type: "link",
//     href: "/pegawai/list-surat-keluar",
//     content: "Surat Keluar",
//    },
//   ],
//  },
//  {
//   type: "text",
//   content: "USER",
//  },
//  {
//   type: "link",
//   href: "/logout",
//   content: "Keluar",
//   icon: "PowerIcon",
//  },
// ];
