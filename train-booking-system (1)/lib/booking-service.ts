// Service untuk mengelola logika pemesanan tiket
// Implementasi Repository Pattern dan Clean Code

export interface Route {
  from: string
  to: string
  price: number
  duration: string
}

export interface TrainClass {
  multiplier: number
  description: string
}

export interface BookingData {
  route: string
  class: string
  passengerName: string
  passengerEmail: string
  passengerPhone: string
  travelDate: string
}

export interface Ticket {
  id: string
  bookingCode: string
  route: Route
  class: string
  passenger: {
    name: string
    email: string
    phone: string
  }
  travelDate: string
  totalPrice: number
  status: "confirmed" | "cancelled" | "pending"
  createdAt: Date
}

// Repository Pattern Implementation
export class BookingRepository {
  private tickets: Ticket[] = []

  async saveTicket(ticket: Ticket): Promise<void> {
    // Simulasi penyimpanan ke database
    this.tickets.push(ticket)

    // Dalam implementasi nyata, ini akan menyimpan ke database
    // await database.tickets.create(ticket)
  }

  async getTicketByCode(bookingCode: string): Promise<Ticket | null> {
    return this.tickets.find((ticket) => ticket.bookingCode === bookingCode) || null
  }

  async getTicketsByEmail(email: string): Promise<Ticket[]> {
    return this.tickets.filter((ticket) => ticket.passenger.email === email)
  }
}

// Service Layer Implementation
export class BookingService {
  private repository: BookingRepository

  constructor(repository: BookingRepository) {
    this.repository = repository
  }

  // Input validation dengan defensive programming
  validateBookingData(data: BookingData): string[] {
    const errors: string[] = []

    if (!data.route || data.route.trim() === "") {
      errors.push("Rute harus dipilih")
    }

    if (!data.class || data.class.trim() === "") {
      errors.push("Kelas harus dipilih")
    }

    if (!data.passengerName || data.passengerName.trim() === "") {
      errors.push("Nama penumpang harus diisi")
    }

    if (!data.passengerEmail || !this.isValidEmail(data.passengerEmail)) {
      errors.push("Email tidak valid")
    }

    if (!data.passengerPhone || !this.isValidPhone(data.passengerPhone)) {
      errors.push("Nomor telepon tidak valid")
    }

    if (!data.travelDate || new Date(data.travelDate) < new Date()) {
      errors.push("Tanggal keberangkatan tidak valid")
    }

    return errors
  }

  // Secure coding: Input sanitization
  private sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, "")
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  // Business logic untuk menghitung harga
  calculatePrice(routePrice: number, classMultiplier: number): number {
    if (routePrice < 0 || classMultiplier < 0) {
      throw new Error("Harga dan multiplier harus positif")
    }
    return Math.round(routePrice * classMultiplier)
  }

  // Generate booking code yang aman
  generateBookingCode(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `RB${timestamp}${random}`.toUpperCase()
  }

  // Main booking process
  async createBooking(
    data: BookingData,
    routes: Record<string, Route>,
    classes: Record<string, TrainClass>,
  ): Promise<{ success: boolean; ticket?: Ticket; errors?: string[] }> {
    try {
      // Validate input
      const validationErrors = this.validateBookingData(data)
      if (validationErrors.length > 0) {
        return { success: false, errors: validationErrors }
      }

      // Sanitize input data
      const sanitizedData = {
        ...data,
        passengerName: this.sanitizeInput(data.passengerName),
        passengerEmail: this.sanitizeInput(data.passengerEmail),
        passengerPhone: this.sanitizeInput(data.passengerPhone),
      }

      // Get route and class info
      const route = routes[sanitizedData.route]
      const trainClass = classes[sanitizedData.class]

      if (!route || !trainClass) {
        return { success: false, errors: ["Rute atau kelas tidak valid"] }
      }

      // Calculate total price
      const totalPrice = this.calculatePrice(route.price, trainClass.multiplier)

      // Create ticket
      const ticket: Ticket = {
        id: crypto.randomUUID(),
        bookingCode: this.generateBookingCode(),
        route,
        class: sanitizedData.class,
        passenger: {
          name: sanitizedData.passengerName,
          email: sanitizedData.passengerEmail,
          phone: sanitizedData.passengerPhone,
        },
        travelDate: sanitizedData.travelDate,
        totalPrice,
        status: "confirmed",
        createdAt: new Date(),
      }

      // Save to repository
      await this.repository.saveTicket(ticket)

      return { success: true, ticket }
    } catch (error) {
      console.error("Error creating booking:", error)
      return { success: false, errors: ["Terjadi kesalahan sistem"] }
    }
  }
}

// Singleton pattern untuk service instance
let bookingServiceInstance: BookingService | null = null

export function getBookingService(): BookingService {
  if (!bookingServiceInstance) {
    const repository = new BookingRepository()
    bookingServiceInstance = new BookingService(repository)
  }
  return bookingServiceInstance
}
