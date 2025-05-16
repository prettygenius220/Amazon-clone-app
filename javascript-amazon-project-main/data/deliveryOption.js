class deliverOption{
  id;
  days;
  costCents;

  constructor(deliverOptions){
    this.id = deliverOptions.id;
    this.days = deliverOptions.days;
    this.costCents = deliverOptions.costCents
  }

  cents2Dollars(){
    return `$${(this.costCents / 100).toFixed(2)}`
  }
}

export const deliveryOptions = [
  {
    id: '1',
    days: 2, 
    costCents: 999
  },
  {
    id: '2', 
    days: 5, 
    costCents: 499
  },
  {
    id: '3', 
    days: 7, 
    costCents: 0
  }
].map((deliverOptions) => {
  return new deliverOption(deliverOptions)
})