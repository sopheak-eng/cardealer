import { useState } from 'react'
import type { FormEvent } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000'

const featuredCars = [
  {
    id: 1,
    brand: 'Porsche',
    name: '2026 Porsche 911 Carrera',
    price: '$148,900',
    priceValue: 148900,
    transmission: 'Auto',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    accent: 'Velocity Red',
  },
  {
    id: 2,
    brand: 'Range Rover',
    name: '2025 Range Rover Sport',
    price: '$96,500',
    priceValue: 96500,
    transmission: 'Auto',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    accent: 'Graphite Edition',
  },
  {
    id: 3,
    brand: 'BMW',
    name: '2026 BMW i5 M60',
    price: '$84,200',
    priceValue: 84200,
    transmission: 'Auto',
    image:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    accent: 'Electric Drive',
  },
  {
    id: 4,
    brand: 'Mercedes-Benz',
    name: '2025 Mercedes-Benz GLC Coupe',
    price: '$71,990',
    priceValue: 71990,
    transmission: 'Auto',
    image:
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    accent: 'Night Package',
  },
  {
    id: 5,
    brand: 'Audi',
    name: '2025 Audi RS e-tron GT',
    price: '$126,400',
    priceValue: 126400,
    transmission: 'Auto',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    accent: 'Quattro Performance',
  },
  {
    id: 6,
    brand: 'Lexus',
    name: '2025 Lexus RX 500h F Sport',
    price: '$68,700',
    priceValue: 68700,
    transmission: 'Manual',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    accent: 'Hybrid Luxury',
  },
]

const priceRangeOptions = [
  { labelEn: 'Any price', labelKm: 'តម្លៃណាមួយ', min: 0, max: Number.POSITIVE_INFINITY },
  { labelEn: 'Under $80k', labelKm: 'ក្រោម $80k', min: 0, max: 80000 },
  { labelEn: '$80k - $110k', labelKm: '$80k - $110k', min: 80000, max: 110000 },
  { labelEn: '$110k - $140k', labelKm: '$110k - $140k', min: 110000, max: 140000 },
  { labelEn: '$140k+', labelKm: 'លើស $140k', min: 140000, max: Number.POSITIVE_INFINITY },
]

type Language = 'en' | 'km'

type Car = (typeof featuredCars)[number]

type CarFormValues = {
  brand: string
  name: string
  price: string
  transmission: Car['transmission']
  image: string
  accent: string
}

const emptyCarForm: CarFormValues = {
  brand: '',
  name: '',
  price: '',
  transmission: 'Auto',
  image: '',
  accent: '',
}

const fallbackCarImage =
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80'

const copy = {
  en: {
    languageButton: 'English',
    marketLabel: 'Premium Car Market',
    dashboardLabel: 'Member Dashboard',
    searchPlaceholder: 'Search by brand, model, or body style',
    login: 'Login',
    logout: 'Logout',
    eyebrow: 'Performance Meets Prestige',
    heroTitle: 'Find the car that changes every drive into an event.',
    heroText:
      'Explore premium sedans, family SUVs, and electric icons with transparent pricing, gallery-rich listings, and a buying experience designed for speed.',
    browseInventory: 'Browse Inventory',
    bookTestDrive: 'Book a Test Drive',
    premiumVehicles: 'Premium vehicles in stock',
    fastFinancing: 'Fast financing pre-approval',
    buyerScore: 'Buyer satisfaction score',
    featuredArrival: 'Featured Arrival',
    arrivalText: 'Grand touring power with handcrafted detail.',
    featuredInventory: 'Featured Inventory',
    inventoryTitle: 'Curated cars worth pulling over for',
    inventoryText:
      'Browse a handpicked collection of performance, luxury, and family-ready models with transparent pricing and premium photo galleries.',
    brand: 'Brand',
    allBrands: 'All brands',
    priceRange: 'Price Range',
    engineType: 'Engine Type',
    allTransmissions: 'Manual and Auto',
    manual: 'Manual',
    auto: 'Auto',
    reset: 'Reset',
    showing: 'Showing',
    of: 'of',
    cars: 'cars',
    viewDetails: 'View Details',
    noMatches: 'No cars match those filters. Try another brand, price range, or engine type.',
    memberAccess: 'Member Access',
    loginTitle: 'Login to Velocity Drive',
    email: 'Email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    checking: 'Checking credentials...',
    account: 'Account',
    welcomeBack: 'Welcome back',
    role: 'Role',
    authenticatedArea: 'Authenticated Area',
    savedAccess: 'Saved access is active',
    signedIn: 'Signed in',
    carsAvailable: 'Cars available',
    fastApproval: 'Fast approval',
    tokenStored: 'Stored locally',
    vehicle: 'Vehicle',
    engine: 'Engine',
    status: 'Status',
    action: 'Action',
    available: 'Available',
    view: 'View',
    noDashboardMatches: 'No cars match those filters.',
  },
  km: {
    languageButton: 'ភាសាខ្មែរ',
    marketLabel: 'ទីផ្សាររថយន្តប្រណិត',
    dashboardLabel: 'ផ្ទាំងគ្រប់គ្រងសមាជិក',
    searchPlaceholder: 'ស្វែងរកតាមម៉ាក ម៉ូដែល ឬប្រភេទរថយន្ត',
    login: 'ចូលគណនី',
    logout: 'ចាកចេញ',
    eyebrow: 'សមត្ថភាព និងភាពប្រណិត',
    heroTitle: 'ស្វែងរករថយន្តដែលធ្វើឱ្យរាល់ការបើកបរមានន័យពិសេស។',
    heroText:
      'មើលរថយន្ត Sedan ប្រណិត SUV សម្រាប់គ្រួសារ និងរថយន្តអគ្គិសនី ជាមួយតម្លៃច្បាស់ រូបភាពច្រើន និងបទពិសោធន៍ទិញលឿន។',
    browseInventory: 'មើលរថយន្ត',
    bookTestDrive: 'កក់សាកបើក',
    premiumVehicles: 'រថយន្តប្រណិតមានស្តុក',
    fastFinancing: 'អនុម័តហិរញ្ញប្បទានរហ័ស',
    buyerScore: 'ពិន្ទុពេញចិត្តអតិថិជន',
    featuredArrival: 'រថយន្តថ្មីណែនាំ',
    arrivalText: 'ថាមពលបើកបរឆ្ងាយ ជាមួយការរចនាលម្អិត។',
    featuredInventory: 'រថយន្តពិសេស',
    inventoryTitle: 'ជម្រើសរថយន្តដែលគួរឱ្យចាប់អារម្មណ៍',
    inventoryText:
      'មើលជម្រើសរថយន្តសមត្ថភាពខ្ពស់ ប្រណិត និងសមស្របសម្រាប់គ្រួសារ ជាមួយតម្លៃច្បាស់ និងរូបភាពល្អ។',
    brand: 'ម៉ាក',
    allBrands: 'ម៉ាកទាំងអស់',
    priceRange: 'ចន្លោះតម្លៃ',
    engineType: 'ប្រភេទម៉ាស៊ីន',
    allTransmissions: 'លេខដៃ និងអូតូ',
    manual: 'លេខដៃ',
    auto: 'អូតូ',
    reset: 'សម្អាត',
    showing: 'បង្ហាញ',
    of: 'ក្នុងចំណោម',
    cars: 'រថយន្ត',
    viewDetails: 'មើលព័ត៌មាន',
    noMatches: 'រកមិនឃើញរថយន្តតាមតម្រងនេះទេ។ សូមសាកល្បងម៉ាក តម្លៃ ឬប្រភេទម៉ាស៊ីនផ្សេងទៀត។',
    memberAccess: 'ចូលប្រើសមាជិក',
    loginTitle: 'ចូលគណនី Velocity Drive',
    email: 'អ៊ីមែល',
    password: 'ពាក្យសម្ងាត់',
    passwordPlaceholder: 'បញ្ចូលពាក្យសម្ងាត់',
    checking: 'កំពុងពិនិត្យ...',
    account: 'គណនី',
    welcomeBack: 'សូមស្វាគមន៍',
    role: 'តួនាទី',
    authenticatedArea: 'ផ្នែកសមាជិក',
    savedAccess: 'បានចូលប្រើដោយជោគជ័យ',
    signedIn: 'បានចូល',
    carsAvailable: 'រថយន្តមាន',
    fastApproval: 'អនុម័តរហ័ស',
    tokenStored: 'រក្សាទុកក្នុងម៉ាស៊ីន',
    vehicle: 'រថយន្ត',
    engine: 'ម៉ាស៊ីន',
    status: 'ស្ថានភាព',
    action: 'សកម្មភាព',
    available: 'មាន',
    view: 'មើល',
    noDashboardMatches: 'រកមិនឃើញរថយន្តតាមតម្រងនេះទេ។',
  },
}

type LoginResponse = {
  message?: string
  token?: string
  user?: AuthUser
}

type AuthUser = {
  id: number
  full_name: string
  email: string
  role: string
}

function App() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem('auth_user')

    if (!storedUser || !localStorage.getItem('auth_token')) {
      return null
    }

    try {
      return JSON.parse(storedUser) as AuthUser
    } catch {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      return null
    }
  })
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('0')
  const [selectedTransmission, setSelectedTransmission] = useState('all')
  const [language, setLanguage] = useState<Language>('en')
  const [cars, setCars] = useState<Car[]>(featuredCars)
  const [isCarFormOpen, setIsCarFormOpen] = useState(false)
  const [editingCarId, setEditingCarId] = useState<number | null>(null)
  const [carForm, setCarForm] = useState<CarFormValues>(emptyCarForm)
  const [carFormError, setCarFormError] = useState('')
  const t = copy[language]
  const brandOptions = [...new Set(cars.map((car) => car.brand))]

  const activePriceRange =
    priceRangeOptions[Number(selectedPriceRange)] ?? priceRangeOptions[0]

  const filteredCars = cars.filter((car) => {
    const matchesBrand = selectedBrand === 'all' || car.brand === selectedBrand
    const matchesPrice =
      car.priceValue >= activePriceRange.min && car.priceValue < activePriceRange.max
    const matchesTransmission =
      selectedTransmission === 'all' || car.transmission === selectedTransmission

    return matchesBrand && matchesPrice && matchesTransmission
  })

  function clearFilters() {
    setSelectedBrand('all')
    setSelectedPriceRange('0')
    setSelectedTransmission('all')
  }

  function formatTransmission(transmission: string) {
    if (transmission === 'Manual') {
      return t.manual
    }

    if (transmission === 'Auto') {
      return t.auto
    }

    return transmission
  }

  function openAddCarForm() {
    setEditingCarId(null)
    setCarForm(emptyCarForm)
    setCarFormError('')
    setIsCarFormOpen(true)
  }

  function openEditCarForm(car: Car) {
    setEditingCarId(car.id)
    setCarForm({
      brand: car.brand,
      name: car.name,
      price: String(car.priceValue),
      transmission: car.transmission,
      image: car.image,
      accent: car.accent,
    })
    setCarFormError('')
    setIsCarFormOpen(true)
  }

  function handleDeleteCar(id: number) {
    setCars((currentCars) => currentCars.filter((car) => car.id !== id))
  }

  function handleCarFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const priceValue = Number(carForm.price)
    const brand = carForm.brand.trim()
    const name = carForm.name.trim()

    if (!brand || !name || !Number.isFinite(priceValue) || priceValue <= 0) {
      setCarFormError('Please enter brand, vehicle name, and a price greater than 0.')
      return
    }

    const normalizedCar = {
      brand,
      name,
      price: `$${priceValue.toLocaleString('en-US')}`,
      priceValue,
      transmission: carForm.transmission,
      image: carForm.image.trim() || fallbackCarImage,
      accent: carForm.accent.trim() || 'New Arrival',
    }

    if (editingCarId) {
      setCars((currentCars) =>
        currentCars.map((car) =>
          car.id === editingCarId ? { ...car, ...normalizedCar } : car,
        ),
      )
    } else {
      setCars((currentCars) => [
        { id: Date.now(), ...normalizedCar },
        ...currentCars,
      ])
    }

    setIsCarFormOpen(false)
    setEditingCarId(null)
    setCarForm(emptyCarForm)
    setCarFormError('')
    clearFilters()
  }

  function handleLogout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setAuthUser(null)
    setEmail('')
    setPassword('')
    setLoginError('')
    setLoginMessage('')
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoginError('')
    setLoginMessage('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = (await response.json().catch(() => ({}))) as LoginResponse

      if (!response.ok) {
        setLoginError(data.message ?? 'Login failed. Please check your credentials.')
        return
      }

      if (data.token && data.user) {
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_user', JSON.stringify(data.user))
        setAuthUser(data.user)
      }

      setLoginMessage(data.message ?? 'Login successful.')
      setIsLoginOpen(false)
      setPassword('')
    } catch {
      setLoginError(
        'The login API could not be reached. Check that Laravel is running and VITE_API_BASE_URL is correct.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authUser) {
    return (
      <main className="min-h-screen bg-[#f6f1e8] text-slate-950">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <a href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                VD
              </span>
              <div>
                <p className="font-['Space_Grotesk'] text-lg font-bold tracking-tight">
                  Velocity Drive
                </p>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  {t.dashboardLabel}
                </p>
              </div>
            </a>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                {authUser.full_name} / {authUser.role}
              </div>
              <button
                type="button"
                onClick={() => setLanguage((current) => (current === 'en' ? 'km' : 'en'))}
                className="h-11 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-red-700 hover:text-red-700"
              >
                {t.languageButton}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="h-11 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                {t.logout}
              </button>
            </div>
          </header>

          <section className="grid flex-1 gap-6 py-8 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-700">
                {t.account}
              </p>
              <h1 className="mt-3 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-950">
                {t.welcomeBack}, {authUser.full_name}
              </h1>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">{t.email}</dt>
                  <dd className="mt-1 text-slate-950">{authUser.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">{t.role}</dt>
                  <dd className="mt-1 capitalize text-slate-950">{authUser.role}</dd>
                </div>
              </dl>
            </aside>

            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-700">
                    {t.authenticatedArea}
                  </p>
                  <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-950">
                    {t.savedAccess}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                    {t.signedIn}
                  </span>
                  <button
                    type="button"
                    onClick={openAddCarForm}
                    className="rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-800"
                  >
                    Add Item
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-950">250+</p>
                  <p className="mt-1 text-sm text-slate-500">{t.carsAvailable}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-950">24h</p>
                  <p className="mt-1 text-sm text-slate-500">{t.fastApproval}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-slate-950">Token</p>
                  <p className="mt-1 text-sm text-slate-500">{t.tokenStored}</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.brand}
                  </span>
                  <select
                    value={selectedBrand}
                    onChange={(event) => setSelectedBrand(event.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
                  >
                    <option value="all">{t.allBrands}</option>
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.priceRange}
                  </span>
                  <select
                    value={selectedPriceRange}
                    onChange={(event) => setSelectedPriceRange(event.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
                  >
                    {priceRangeOptions.map((range, index) => (
                      <option key={range.labelEn} value={String(index)}>
                        {language === 'en' ? range.labelEn : range.labelKm}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.engineType}
                  </span>
                  <select
                    value={selectedTransmission}
                    onChange={(event) => setSelectedTransmission(event.target.value)}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400"
                  >
                    <option value="all">{t.allTransmissions}</option>
                    <option value="Manual">{t.manual}</option>
                    <option value="Auto">{t.auto}</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-11 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-900 transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                >
                  {t.reset}
                </button>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-600">
                {t.showing} {filteredCars.length} {t.of} {cars.length} {t.cars}
              </p>

              <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                <div className="grid grid-cols-[1.25fr_0.8fr_0.8fr_minmax(17rem,1.4fr)] bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
                  <span>{t.vehicle}</span>
                  <span>{t.engine}</span>
                  <span>{t.status}</span>
                  <span>{t.action}</span>
                </div>
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="grid grid-cols-[1.25fr_0.8fr_0.8fr_minmax(17rem,1.4fr)] items-center gap-3 border-t border-slate-200 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-slate-950">{car.name}</span>
                    <span className="text-slate-600">{formatTransmission(car.transmission)}</span>
                    <span className="text-slate-600">{t.available}</span>
                    <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="rounded-full border border-slate-300 px-3 py-1.5 font-semibold text-slate-800 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
                      >
                        {t.view}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditCarForm(car)}
                        className="rounded-full border border-amber-300 px-3 py-1.5 font-semibold text-amber-700 transition hover:border-amber-600 hover:bg-amber-500 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCar(car.id)}
                        className="rounded-full border border-red-200 px-3 py-1.5 font-semibold text-red-700 transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCars.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                  {t.noDashboardMatches}
                </div>
              ) : null}
            </section>
          </section>

          {isCarFormOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
              <form
                onSubmit={handleCarFormSubmit}
                noValidate
                className="w-full max-w-2xl rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.28)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700">
                      Inventory Item
                    </p>
                    <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-950">
                      {editingCarId ? 'Edit Item' : 'Add Item'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCarFormOpen(false)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-xl text-slate-500 transition hover:border-slate-950 hover:text-slate-950"
                    aria-label="Close item form"
                  >
                    x
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Brand
                    </span>
                    <input
                      type="text"
                      value={carForm.brand}
                      onChange={(event) =>
                        setCarForm((current) => ({ ...current, brand: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Vehicle Name
                    </span>
                    <input
                      type="text"
                      value={carForm.name}
                      onChange={(event) =>
                        setCarForm((current) => ({ ...current, name: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Price
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={carForm.price}
                      onChange={(event) =>
                        setCarForm((current) => ({ ...current, price: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Engine Type
                    </span>
                    <select
                      value={carForm.transmission}
                      onChange={(event) =>
                        setCarForm((current) => ({
                          ...current,
                          transmission: event.target.value as Car['transmission'],
                        }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                    >
                      <option value="Auto">Auto</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Badge Text
                    </span>
                    <input
                      type="text"
                      value={carForm.accent}
                      onChange={(event) =>
                        setCarForm((current) => ({ ...current, accent: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Image URL or PNG
                    </span>
                    <input
                      type="text"
                      value={carForm.image}
                      onChange={(event) =>
                        setCarForm((current) => ({ ...current, image: event.target.value }))
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400"
                      placeholder="image.png or https://example.com/car.png"
                    />
                    <input
                      type="file"
                      accept="image/png,.png"
                      onChange={(event) => {
                        const file = event.target.files?.[0]

                        if (file) {
                          setCarForm((current) => ({
                            ...current,
                            image: URL.createObjectURL(file),
                          }))
                        }
                      }}
                      className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                    />
                  </label>
                </div>

                {carFormError ? (
                  <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {carFormError}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCarFormOpen(false)}
                    className="h-11 rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:border-slate-950"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-11 rounded-full bg-red-700 px-5 text-sm font-semibold text-white transition hover:bg-red-800"
                  >
                    {editingCarId ? 'Save Changes' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-[#f6f1e8] text-slate-950">
        <div className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,_rgba(185,28,28,0.28),_transparent_38%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.18),_transparent_36%),linear-gradient(180deg,_#fff8ef_0%,_#f6f1e8_100%)]" />
          <div className="absolute left-[-6rem] top-32 h-48 w-48 rounded-full bg-red-700/10 blur-3xl" />
          <div className="absolute right-[-4rem] top-64 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-8">
            <header className="rounded-full border border-white/70 bg-white/75 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between gap-4">
                  <a href="/" className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold uppercase tracking-[0.3em] text-white">
                      VD
                    </span>
                    <div>
                      <p className="font-['Space_Grotesk'] text-lg font-bold tracking-tight">
                        Velocity Drive
                      </p>
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                        {t.marketLabel}
                      </p>
                    </div>
                  </a>

                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
                    aria-label="Open menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-3 lg:max-w-2xl lg:flex-row lg:items-center">
                  <label className="group flex h-12 flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-4 transition focus-within:border-red-400 focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5 text-slate-400 transition group-focus-within:text-red-500"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path strokeLinecap="round" d="m20 20-3.5-3.5" />
                    </svg>
                    <input
                      type="search"
                      placeholder={t.searchPlaceholder}
                      className="h-full w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setLanguage((current) => (current === 'en' ? 'km' : 'en'))}
                    className="h-12 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 transition hover:border-red-700 hover:text-red-700"
                  >
                    {t.languageButton}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsLoginOpen(true)}
                    className="h-12 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    {t.login}
                  </button>
                </div>
              </div>
            </header>

            <section className="grid flex-1 gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-700">
                  {t.eyebrow}
                </span>
                <h1 className="mt-6 font-['Space_Grotesk'] text-5xl font-bold leading-[0.95] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  {t.heroTitle}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  {t.heroText}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    className="rounded-full bg-red-700 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(185,28,28,0.28)] transition hover:bg-red-800"
                  >
                    {t.browseInventory}
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-950 hover:bg-white"
                  >
                    {t.bookTestDrive}
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur">
                    <p className="text-3xl font-bold text-slate-950">250+</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {t.premiumVehicles}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur">
                    <p className="text-3xl font-bold text-slate-950">24h</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {t.fastFinancing}
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur col-span-2 sm:col-span-1">
                    <p className="text-3xl font-bold text-slate-950">4.9/5</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {t.buyerScore}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-3 top-12 hidden h-24 w-24 rounded-[2rem] border border-white/80 bg-white/70 backdrop-blur lg:block" />
                <div className="absolute -right-4 bottom-16 hidden h-36 w-36 rounded-full bg-red-700/15 blur-2xl lg:block" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.22)] sm:p-5">
                  <img
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80"
                    alt="Luxury sports car in a showroom-inspired setting"
                    className="h-[24rem] w-full rounded-[1.5rem] object-cover sm:h-[30rem]"
                  />

                  <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/10 bg-black/45 p-5 text-white backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.28em] text-red-200">
                      {t.featuredArrival}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <h2 className="font-['Space_Grotesk'] text-2xl font-bold sm:text-3xl">
                          Aston Martin DB12
                        </h2>
                        <p className="mt-1 text-sm text-slate-200">
                          {t.arrivalText}
                        </p>
                      </div>
                      <p className="text-xl font-semibold text-white">$239,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-4">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-700">
                    {t.featuredInventory}
                  </p>
                  <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    {t.inventoryTitle}
                  </h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-500 sm:text-right">
                  {t.inventoryText}
                </p>
              </div>

              <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.06)] backdrop-blur md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.brand}
                  </span>
                  <select
                    value={selectedBrand}
                    onChange={(event) => setSelectedBrand(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                  >
                    <option value="all">{t.allBrands}</option>
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.priceRange}
                  </span>
                  <select
                    value={selectedPriceRange}
                    onChange={(event) => setSelectedPriceRange(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                  >
                    {priceRangeOptions.map((range, index) => (
                      <option key={range.labelEn} value={String(index)}>
                        {language === 'en' ? range.labelEn : range.labelKm}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {t.engineType}
                  </span>
                  <select
                    value={selectedTransmission}
                    onChange={(event) => setSelectedTransmission(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                  >
                    <option value="all">{t.allTransmissions}</option>
                    <option value="Manual">{t.manual}</option>
                    <option value="Auto">{t.auto}</option>
                  </select>
                </label>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="h-12 rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                >
                  {t.reset}
                </button>
              </div>

              <p className="mb-4 text-sm font-semibold text-slate-600">
                {t.showing} {filteredCars.length} {t.of} {cars.length} {t.cars}
              </p>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCars.map((car) => (
                  <article
                    key={car.id}
                    className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                        {car.accent}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-slate-950">
                          {car.name}
                        </h3>
                        <p className="whitespace-nowrap text-lg font-semibold text-red-700">
                          {car.price}
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {t.arrivalText}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {car.brand}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          {formatTransmission(car.transmission)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-red-700 hover:bg-red-700 hover:text-white"
                      >
                        {t.viewDetails}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredCars.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
                  {t.noMatches}
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </main>

      {isLoginOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] border border-white/70 bg-[#fffaf2] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.28)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-700">
                  {t.memberAccess}
                </p>
                <h2 className="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-slate-950">
                  {t.loginTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsLoginOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-950 hover:text-slate-950"
                aria-label="Close login dialog"
              >
                ×
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {t.email}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                  placeholder="admin@cardealer.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  {t.password}
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                  placeholder={t.passwordPlaceholder}
                  autoComplete="current-password"
                  required
                />
              </label>

              {loginError ? (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {loginError}
                </p>
              ) : null}

              {loginMessage ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {loginMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-13 w-full items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? t.checking : t.login}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default App
