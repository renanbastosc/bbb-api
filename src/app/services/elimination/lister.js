import Elimination from "../../models/Elimination";
import EliminationHouseGuest from "../../models/EliminationHouseGuest";

class EliminationLister {
  async list() {
    const eliminations = await Elimination.findAll({
      include: [EliminationHouseGuest],
    });

    return eliminations.map(
      ({ id, date, current, elimination_house_guests }) => ({
        id,
        date,
        current,
        elimination_house_guests: elimination_house_guests.map((ehg) => ({
          id: ehg.id,
          house_guest_id: ehg.house_guest_id,
        })),
      })
    );
  }
}

export default EliminationLister;
