import Card from './Card'
import './Board.css'

export default function Board() {
  const cards =[
    { id: 1, imgSrc: "https://s.abcnews.com/images/US/electric-plane-ht-ml-240110_1704902584341_hpMain_16x9_1600.jpg"},
    { id: 2, imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlWLJOmi_F5ROhrA2OL_tunx8hsnL5AlC20zT26mbE9A&s"},
    { id: 3, imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdR7ytGHEs5DR7orIWtpOmSrIux1ffuN9HrKn_4Y_QyA&s"},
    { id: 4, imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWoUXIOSZxvhhPWOS7UxEU43fK6v82bvEKmMtPHDCr_w&s"},
    { id: 5, imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpCKpNRlCMbIbo-lj33L0SQqUDNzZpYGDZV_tnN7e8fQ&s"},
    { id: 6, imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdR7ytGHEs5DR7orIWtpOmSrIux1ffuN9HrKn_4Y_QyA&s"}

  ];

  return (
    <div className="board">
      <div className="board-row">
        {cards.map(card => (
          <Card key={card.id} imgSrc={card.imgSrc} id={card.id}/>
        ))}
      </div>
    </div>
  )
}