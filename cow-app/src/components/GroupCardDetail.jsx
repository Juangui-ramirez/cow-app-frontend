import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";

export const GroupCardDetail = ({
  data,
  members,
  bills,
  onAddBill,
  onAddMember,
  onSettleSplit,
  onDeleteGroup,
}) => {
  const { name, color, createdat } = data;
  const currentUserId = Number(sessionStorage.getItem("userId"));

  const [showBillForm, setShowBillForm] = useState(false);
  const [showFriendForm, setShowFriendForm] = useState(false);
  const [billDescription, setBillDescription] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [error, setError] = useState("");

  const date = new Date(createdat);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const yourTotalOwe = bills
    .flatMap((bill) => bill.splits || [])
    .filter((split) => split.userId === currentUserId && !split.settled)
    .reduce((total, split) => total + Number(split.amountOwed), 0);

  const handleSubmitBill = async (e) => {
    e.preventDefault();
    setError("");
    if (!billDescription.trim() || !billAmount) {
      setError("Description and amount are required");
      return;
    }
    await onAddBill(billDescription.trim(), Number(billAmount));
    setBillDescription("");
    setBillAmount("");
    setShowBillForm(false);
  };

  const handleSubmitFriend = async (e) => {
    e.preventDefault();
    setError("");
    if (!friendEmail.trim()) {
      setError("Email is required");
      return;
    }
    await onAddMember(friendEmail.trim());
    setFriendEmail("");
    setShowFriendForm(false);
  };

  return (
    <>
      <div className="flex m-6">
        <div className="flex justify-between gap-4 w-full">
          <button
            className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md"
            onClick={() => {
              setShowFriendForm(false);
              setError("");
              setShowBillForm((prev) => !prev);
            }}
          >
            New Bill
          </button>
          <button
            className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md"
            onClick={() => {
              setShowBillForm(false);
              setError("");
              setShowFriendForm((prev) => !prev);
            }}
          >
            New Friend
          </button>
          <button className="bg-brownppal text-white font-semibold w-28 h-8 rounded-md">
            Edit Group
          </button>
        </div>
      </div>

      {showBillForm && (
        <form onSubmit={handleSubmitBill} className="flex flex-col gap-3 m-6 max-w-md">
          <input
            type="text"
            placeholder="What was it for?"
            className="border rounded font-semibold py-2 px-3"
            value={billDescription}
            onChange={(e) => setBillDescription(e.target.value)}
            maxLength={100}
          />
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Amount"
            className="border rounded font-semibold py-2 px-3"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
          />
          <button
            type="submit"
            className="bg-brownppal text-white font-medium rounded-md h-[40px] w-full"
          >
            Save Bill
          </button>
        </form>
      )}

      {showFriendForm && (
        <form onSubmit={handleSubmitFriend} className="flex flex-col gap-3 m-6 max-w-md">
          <input
            type="email"
            placeholder="Friend's email"
            className="border rounded font-semibold py-2 px-3"
            value={friendEmail}
            onChange={(e) => setFriendEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-brownppal text-white font-medium rounded-md h-[40px] w-full"
          >
            Add to group
          </button>
        </form>
      )}

      {error && <p className="text-rederror font-semibold m-6">{error}</p>}

      <div className="flex m-4 gap-6 h-full">
        <img
          src={Logo}
          alt=""
          className=" max-w-32  p-2 rounded-lg "
          style={{ backgroundColor: color }}
        />
        <div className="flex flex-col justify-between w-full ">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-black font-bold">
            Your Total Owe:{" "}
            <span className="text-red-600">
              ${yourTotalOwe.toLocaleString("es-CO")}
            </span>
          </p>
          <p className="text-black font-bold">
            Participants: <span className="text-red-600">{members.length}</span>
          </p>
          <button
            className="bg-brownppal text-white font-semibold w-[80%] max-w-[180px] h-10 rounded-md"
            onClick={onDeleteGroup}
          >
            Delete group
          </button>
        </div>
      </div>

      <h1 className="m-4 text-2xl font-bold text-amarello">
        Friends and Bills
      </h1>
      <p className="ml-6">{formattedDate}</p>

      <div className="m-6">
        <h2 className="font-bold text-lg mb-2">Participants</h2>
        <ul className="mb-6">
          {members.map((member) => (
            <li key={member.userId}>
              {member.name} ({member.email})
            </li>
          ))}
        </ul>

        <h2 className="font-bold text-lg mb-2">Bills</h2>
        {bills.length === 0 ? (
          <p>No bills yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {bills.map((bill) => (
              <li key={bill.id} className="border-b-2 shadow p-3">
                <p className="font-bold">
                  {bill.description} — ${Number(bill.amount).toLocaleString("es-CO")}
                </p>
                <ul className="ml-4">
                  {(bill.splits || []).map((split) => (
                    <li key={split.id} className="flex justify-between items-center gap-3">
                      <span>
                        {split.name} owes ${Number(split.amountOwed).toLocaleString("es-CO")}
                        {split.settled ? " (paid)" : ""}
                      </span>
                      {!split.settled && split.userId === currentUserId && (
                        <button
                          className="bg-brownppal text-white font-semibold rounded-md px-2 h-7 text-sm"
                          onClick={() => onSettleSplit(split.id)}
                        >
                          Mark as paid
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

GroupCardDetail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    createdat: PropTypes.string.isRequired,
  }).isRequired,
  members: PropTypes.array,
  bills: PropTypes.array,
  onAddBill: PropTypes.func,
  onAddMember: PropTypes.func,
  onSettleSplit: PropTypes.func,
  onDeleteGroup: PropTypes.func,
};

GroupCardDetail.defaultProps = {
  members: [],
  bills: [],
  onAddBill: () => {},
  onAddMember: () => {},
  onSettleSplit: () => {},
  onDeleteGroup: () => {},
};
