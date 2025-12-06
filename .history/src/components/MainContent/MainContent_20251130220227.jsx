export default function MainContent({ TableComponent, CardComponent, LoadingComponent }) {
  return (
    <div className="cards-container">
      <div className="cards-spacer">
        <div className="cards-content">
          {TableComponent}
          {CardComponent}
          {LoadingComponent}
        </div>
      </div>
    </div>
  );
}