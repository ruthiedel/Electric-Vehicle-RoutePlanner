import Card from './card'

type props ={
    items:{point:{lat:number,lng:number},name:string,distance:number}[]
}
export default function CardRow(p:props) {
  return (
    <div className="row">
      {p.items.map((item, index) => (
        <div key={index} className="col-md-3">
      {item&&<Card item={item}  /> }
        </div>
      ))}
    </div>
  );
};

