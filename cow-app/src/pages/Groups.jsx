import { GroupCard } from "../components/GroupCard";

export function Groups() {
  return (
    <section className="p-8">
      <div className="flex justify-end">
        <button className="bg-[#36190D] text-white font-medium rounded-md h-[30px] w-[120px] ">
          New Group
        </button>
      </div>
      <div className="pb-8">
        <h2 className="font-bold">You owe</h2>
        <p className="text-red-600 font-bold text-2xl">$45.000</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
      <GroupCard />
      <GroupCard />
      <GroupCard />
      </div>
    </section>
  );
}
