# train_ticketing.py

# ========================
# Table-Driven Definitions
# ========================
ROUTES = {
    ("Jakarta", "Bandung"): 100000,
    ("Jakarta", "Yogyakarta"): 200000,
    ("Bandung", "Surabaya"): 250000,
    ("Yogyakarta", "Surabaya"): 180000,
}

CLASSES = {
    "Ekonomi": 1.0,
    "Bisnis": 1.5,
    "Eksekutif": 2.0
}

# ========================
# Automata States
# ========================
class BookingState:
    START = "Start"
    SELECT_ROUTE = "SelectRoute"
    SELECT_CLASS = "SelectClass"
    ENTER_PASSENGER = "EnterPassenger"
    CONFIRM = "Confirm"
    DONE = "Done"


# ========================
# Utility Functions (Code Reuse)
# ========================
def list_routes():
    print("Daftar Rute:")
    for i, ((from_city, to_city), price) in enumerate(ROUTES.items(), start=1):
        print(f"{i}. {from_city} -> {to_city} | Rp{price}")


def list_classes():
    print("Kelas Tersedia:")
    for i, (cls, multiplier) in enumerate(CLASSES.items(), start=1):
        print(f"{i}. {cls} (x{multiplier})")


def calculate_price(base_price, cls):
    return int(base_price * CLASSES.get(cls, 1))


# ========================
# Defensive Input Function
# ========================
def get_valid_input(prompt, valid_options):
    while True:
        response = input(prompt).strip()
        if response in valid_options:
            return response
        else:
            print("Input tidak valid. Coba lagi.")


# ========================
# Main Booking Function
# ========================
def book_ticket():
    state = BookingState.START
    selected_route = None
    selected_class = None
    passenger_name = None

    while state != BookingState.DONE:
        if state == BookingState.START:
            print("=== Aplikasi Pemesanan Tiket Kereta Api ===")
            state = BookingState.SELECT_ROUTE

        elif state == BookingState.SELECT_ROUTE:
            list_routes()
            try:
                choice = int(input("Pilih rute (nomor): "))
                route = list(ROUTES.items())[choice - 1]
                selected_route = route
                state = BookingState.SELECT_CLASS
            except (IndexError, ValueError):
                print("Pilihan tidak valid. Coba lagi.")

        elif state == BookingState.SELECT_CLASS:
            list_classes()
            choice = get_valid_input("Pilih kelas (Ekonomi/Bisnis/Eksekutif): ", CLASSES.keys())
            selected_class = choice
            state = BookingState.ENTER_PASSENGER

        elif state == BookingState.ENTER_PASSENGER:
            name = input("Masukkan nama penumpang: ").strip()
            if name:
                passenger_name = name
                state = BookingState.CONFIRM
            else:
                print("Nama tidak boleh kosong.")

        elif state == BookingState.CONFIRM:
            from_city, to_city = selected_route[0]
            base_price = selected_route[1]
            total_price = calculate_price(base_price, selected_class)

            print("\n=== Konfirmasi Pemesanan ===")
            print(f"Nama Penumpang: {passenger_name}")
            print(f"Rute: {from_city} -> {to_city}")
            print(f"Kelas: {selected_class}")
            print(f"Harga: Rp{total_price}")
            confirm = get_valid_input("Konfirmasi pemesanan? (y/n): ", ["y", "n"])
            if confirm == "y":
                print("Tiket berhasil dipesan!\n")
                state = BookingState.DONE
            else:
                print("Pemesanan dibatalkan.")
                return

# ========================
# Entry Point
# ========================
if __name__ == "__main__":
    try:
        book_ticket()
    except KeyboardInterrupt:
        print("\nAplikasi dihentikan oleh pengguna.")