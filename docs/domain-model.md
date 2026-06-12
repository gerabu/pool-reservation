# Domain Model — Pool Reservation

## Bounded contexts
- **Reservations**: residents booking and cancelling slots
- **Maintenance**: admin scheduling and cancelling maintenance windows
- Shared: availability (derived view over both, no events of its own)

## Reservations context

### Create reservation
Rules:
- Slot must not overlap another reservation
- Slot must not overlap a maintenance window
- Max 10 people per reservation
- One active reservation per unit per day
→ Reservation created | Reservation rejected

### Cancel reservation
Rules:
- Reservation must be active
→ Reservation cancelled | Cancellation rejected

## Maintenance context

### Schedule maintenance
Rules:
- Slot must not overlap another maintenance window
- Slot must not overlap an active reservation (ADR-001: rejected, no cascade)
→ Maintenance scheduled | Maintenance rejected

### Cancel maintenance
Rules:
- Maintenance must be active
→ Maintenance cancelled | Cancellation rejected

## Conventions
- TimeSlots are half-open intervals [start, end) (ADR-002)
- Day = 6 fixed 2-hour slots, 8:00–20:00 (ADR-003)