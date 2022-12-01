import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const ProductModal = ({ booked, setBooked }) => {
  const { name, resailPrice, image, _id } = booked;
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const location = form.location.value;
    const UserName = form.userName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      productId: _id,
      productName: name,
      UserName,
      location,
      email,
      phone,
      image,
      price: resailPrice,
    };
    console.log(booking);

    // Send data to the server

    fetch(
      `https://buy-sell-server-khaki.vercel.app/bookingCollection?email=${user?.email}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setBooked(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="userName"
              type="text"
              readOnly
              placeholder="Your Name"
              className="input w-full input-bordered"
              defaultValue={user.displayName}
            />
            <input
              name="email"
              type="email"
              readOnly
              placeholder="Email Address"
              className="input w-full input-bordered"
              defaultValue={user.email}
            />
            <h1>Price</h1>
            <input
              type="text"
              disabled
              value={resailPrice}
              className="input w-full input-bordered "
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered"
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
