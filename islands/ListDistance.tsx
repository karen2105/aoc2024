import { FunctionComponent } from "preact";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

interface ColumnData {
  col1: number[];
  col2: number[];
}

const ListDistance: FunctionComponent = () => {
  const distance = useSignal(0);

  const createObject = (locations: string) => {
    const col1: Array<number> = [];
    const col2: Array<number> = [];

    locations.split('\n').forEach((location) => {
      const [location1, location2] = location.split(/\s+/);
      col1.push(Number(location1));
      col2.push(Number(location2));
    });

    return { col1, col2 };
  };

  const orderCol = (col: Array<any>) => {
    return col.sort((a, b) => a - b);
  }

  const getDistanceBetweenLocations = (col1: Array<number>, col2: Array<number>) => {
    let tempResult: number = 0;
    col1.forEach((location1, index) => {
      tempResult = tempResult + Math.abs(location1 - col2[index]);
    });

    distance.value = tempResult;
  };

  const calculateDistance = (columns: ColumnData) => {
    getDistanceBetweenLocations(orderCol(columns.col1), orderCol(columns.col2))
  };

  useEffect(() => {
    fetch("/day1.txt")
      .then((response) => response.text())
      .then((locations) => calculateDistance(createObject(locations)));
  }, []);


  return (
    <section class="bg-rose-50">
      <div class="mx-auto w-full pl-4">
        <div class="flex flex-row">

          <div class="m-auto h-auto w-1/3">
            <h2 class="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Advent of code <hr />Day 1
            </h2>
            <p class="mt-4 text-gray-700">
              Total distance is <strong>{distance}</strong>
            </p>
          </div>

          <div class="border-l-3 w-2/3 border-l-rose-200">
            <img
              src="https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1"
              class="h-screen w-full object-cover"
              alt="Day 1 - AOC"
            />
          </div>
        </div>
      </div>
    </section >
  );
};

export default ListDistance;
