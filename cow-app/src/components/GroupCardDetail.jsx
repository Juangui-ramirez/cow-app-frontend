import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/Logo.svg";
import { formatCOP } from "../utils/currency";

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
  const [splitMode, setSplitMode] = useState("equal");
  const [customAmounts, setCustomAmounts] = useState({});
  const [friendEmail, setFriendEmail] = useState("");
  const [error, setError] = useState("");

  const otherMembers = members.filter((member) => member.userId !== currentUserId);
  const billAmountNumber = Number(billAmount) || 0;
  const customTotal = Object.values(customAmounts).reduce(
    (total, value) => total + (Number(value) || 0),
    0
  );
  const customRemaining = billAmountNumber - customTotal;

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

  const handleCustomAmountChange = (userId, value) => {
    setCustomAmounts((prev) => ({ ...prev, [userId]: value }));
  };

  const handleSubmitBill = async (e) => {
    e.preventDefault();
    setError("");
    if (!billDescription.trim() || !billAmount) {
      setError("Description and amount are required");
      return;
    }

    let splits;
    if (splitMode === "custom") {
      if (Math.abs(customRemaining) > 0.01) {
        setError("The amounts must add up to the total bill amount");
        return;
      }
      splits = otherMembers
        .map((member) => ({
          userId: member.userId,
          amountOwed: Number(customAmounts[member.userId]) || 0,
        }))
        .filter((split) => split.amountOwed > 0);
    }

    try {
      await onAddBill(billDescription.trim(), billAmountNumber, splits);
      setBillDescription("");
      setBillAmount("");
      setSplitMode("equal");
      setCustomAmounts({});
      setShowBillForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitFriend = async (e) => {
    e.preventDefault();
    setError("");
    if (!friendEmail.trim()) {
      setError("Email is required");
      return;
    }
    try {
      await onAddMember(friendEmail.trim());
      setFriendEmail("");
      setShowFriendForm(false);
    } catch (error) {
      setError(error.message);
    }
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

          <div className="flex gap-4 text-sm font-semibold">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="splitMode"
                checked={splitMode === "equal"}
                onChange={() => setSplitMode("equal")}
              />
              Split equally
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="splitMode"
                checked={splitMode === "custom"}
                onChange={() => setSplitMode("custom")}
              />
              Split by amount
            </label>
          </div>

          {splitMode === "custom" && (
            <div className="flex flex-col gap-2 border rounded p-3">
              {otherMembers.length === 0 ? (
                <p className="text-sm">No other members to split with.</p>
              ) : (
                otherMembers.map((member) => (
                  <div key={member.userId} className="flex justify-between items-center gap-2">
                    <span className="text-sm">{member.name}</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      className="border rounded py-1 px-2 w-28"
                      value={customAmounts[member.userId] ?? ""}
                      onChange={(e) => handleCustomAmountChange(member.userId, e.target.value)}
                    />
                  </div>
                ))
              )}
              <p className="text-sm font-semibold">
                Remaining to assign: {formatCOP(customRemaining)}
              </p>
            </div>
          )}

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
            <span className="text-red-600">{formatCOP(yourTotalOwe)}</span>
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
                  {bill.description} — {formatCOP(bill.amount)}
                </p>
                <ul className="ml-4">
                  {(bill.splits || []).map((split) => (
                    <li key={split.id} className="flex justify-between items-center gap-3">
                      <span>
                        {split.name} owes {formatCOP(split.amountOwed)}
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
