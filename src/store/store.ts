import { reactive } from "vue";

interface Person {
  id: string;
  numberOfPerson: number;
  totalPerPerson: number;
  paid: boolean;
}

interface Store {
  params: {
    total: number;
    tip: number;
    people: number;
    remaining: number;
  };
  people: Person[];
}

export const store: Store = reactive({
  params: {
    total: 0,
    tip: 0,
    people: 0,
    remaining: 0,
  },
  people: [],
});

export function getGrandTotal(): number {
  return store.params.total * (store.params.tip / 100 + 1);
}

export function calculate(): void {
  store.people = [];
  const total = store.params.total;
  const tip = store.params.tip;
  const people = store.params.people;

  console.log(store.params);
  const totalPerPerson = (total * (tip / 100 + 1)) / people;
  store.params.remaining = total;

  for (let i = 0; i < people; i++) {
    store.people.push({
      id: crypto.randomUUID(),
      numberOfPerson: i + 1,
      totalPerPerson,
      paid: false,
    });
  }
  calculateRemaining();
}

function calculateRemaining(): void {
  const missingToPay = store.people.filter((item) => !item.paid);
  store.params.remaining = missingToPay.reduce((acc, item) => {
    return acc + item.totalPerPerson;
  }, 0);
}

export function pay(id: string, paid: boolean): void {
  const person = store.people.find((item) => item.id === id);
  if (person) {
    person.paid = paid;
    calculateRemaining();
  }
}
