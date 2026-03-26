alter table public.bookings
drop constraint if exists bookings_cabinId_fkey;

alter table public.bookings
add constraint bookings_cabinId_fkey
foreign key ("cabinId")
references public.cabins (id)
on delete cascade;
