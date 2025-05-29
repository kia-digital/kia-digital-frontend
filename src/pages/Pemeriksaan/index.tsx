import Sidebar from "../../components/Sidebar";

// Placeholder untuk ikon jika tidak menggunakan library
const IconPlaceholder = ({ className = "w-5 h-5" }) => (
  <div className={`bg-gray-400 rounded ${className}`}></div>
);
const UserCirclePlaceholder = ({ className = "w-10 h-10" }) => (
  <div className={`bg-gray-400 rounded-full ${className}`}></div>
);
const FileAltPlaceholder = ({ className = "w-4 h-4 mr-2" }) => (
  <div className={`bg-white rounded ${className}`}></div>
);

type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="mb-4">
    <p className="text-xs text-grey-500">{label}</p>
    <p className="text-sm font-medium text-grey-800">{value}</p>
  </div>
);

type CardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const Card = ({ title, icon, children, className = "" }: CardProps) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm ${className}`}>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-grey-900 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <button className="bg-primary-50 text-primary-500 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-100">
        Edit
      </button>
    </div>
    {children}
  </div>
);

const Pemeriksaan = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex">
      <Sidebar />
      {/* MODIFICATION: Added 'flex flex-col' to make this a flex column container.
        Removed 'min-h-screen' as its parent already has it and we want flex to manage height.
        Changed 'bg-grey-200' to 'bg-gray-200' for consistency (assuming it's a typo, adjust if needed).
      */}
      <div className="flex-1 font-poppins bg-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center m-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-500">Pemeriksaan</h1>
            <p className="text-grey-500 mt-1">
              Selamat datang di halaman Pemeriksaan ibu!
            </p>
          </div>
          <div className="flex items-center">
            <button className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-primary-600">
              <FileAltPlaceholder />
              Lembar Pemantauan
            </button>
            <UserCirclePlaceholder className="w-10 h-10 ml-4" />
          </div>
        </div>

        {/* Tabs */}
        <div className="ml-6">
          <nav className="flex space-x-1">
            <a
              href="#"
              className="bg-gray-50 text-primary-500 px-6 py-3 rounded-t-lg font-medium"
            >
              Informasi Ibu
            </a>
            <a
              href="#"
              className="bg-gray-200 text-grey-500 px-6 py-3 rounded-t-lg font-medium hover:bg-gray-100" // Changed bg-grey-200 & hover
            >
              Pemeriksaan ANC
            </a>
            <a
              href="#"
              className="bg-gray-200 text-grey-500 px-6 py-3 rounded-t-lg font-medium hover:bg-gray-100" // Changed bg-grey-200 & hover
            >
              Pemeriksaan Leopold
            </a>
          </nav>
        </div>

        {/* MODIFICATION: Added 'flex-1' to make this div grow and fill available vertical space.
          Ensured 'bg-gray-50' is used, as this seems to be the intended background for the content area based on the active tab and image.
          If you truly want a pure white background, change 'bg-gray-50' to 'bg-white'.
        */}
        <div className="flex flex-col lg:flex-row lg:space-x-8 bg-gray-50 p-6 flex-1">
          {/* Kolom Kiri */}
          <div className="flex-1 space-y-8">
            {/* Data Diri */}
            <Card
              title="Data Diri"
              icon={<IconPlaceholder className="text-primary-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div>
                  <InfoRow label="Nama" value="Hanifah Perestoika" />
                  <InfoRow label="Tempat Lahir" value="Jakarta" />
                  <InfoRow
                    label="Alamat Rumah"
                    value="Jl. Sutera Narada II, Pakulonan"
                  />
                  <InfoRow label="Umur" value="26" />
                </div>
                <div>
                  <InfoRow label="Nomor Telepon" value="0878111525" />
                  <InfoRow label="Tanggal Lahir" value="15/08/1987" />
                  <InfoRow label="Status Pernikahan" value="Nikah" />
                  <InfoRow label="Golongan Darah" value="A" />
                </div>
              </div>
            </Card>

            {/* Data Medis */}
            <Card
              title="Data Medis"
              icon={<IconPlaceholder className="text-primary-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <div>
                  <InfoRow label="Riwayat Penyakit" value="-" />
                  <InfoRow label="Tinggi Badan" value="168 cm" />
                  <InfoRow label="Status Imunisasi" value="-" />
                </div>
                <div>
                  <InfoRow label="Riwayat Alergi" value="-" />
                  <InfoRow label="Berat Badan" value="65 kg" />
                  <InfoRow label="Riwayat Kehamilan" value="-" />
                </div>
              </div>
            </Card>
          </div>

          {/* Kolom Kanan (Sidebar) */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <Card
              title="Informasi Kontak Darurat"
              icon={<IconPlaceholder className="text-primary-500" />}
            >
              <InfoRow label="Nama" value="Hanifah Perestoika" />
              <InfoRow label="Hubungan" value="Suami" />
              <InfoRow label="Nomor Telepon" value="0878111525" />
              <InfoRow
                label="Alamat Kontak Darurat"
                value="Jl. Sutera Narada II, Pakulonan"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pemeriksaan;
