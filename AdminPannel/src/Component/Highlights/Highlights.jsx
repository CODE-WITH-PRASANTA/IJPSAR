import "./Highlights.css";
import { FaMoneyBillWave, FaReceipt } from "react-icons/fa";
import { HiOutlineChartBar } from "react-icons/hi2";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const Highlights = ({ revenue = 0, payments = [], loading }) => {
  return (
    <div className="highlightsWrapper">
      <div className="highlightsHeroCard">
        <div className="highlightsIllustration">
          <div className="highlightsCircle">
            <HiOutlineChartBar />
          </div>
          <div className="highlightsFloatingCard"></div>
        </div>
        <h2 className="highlightsHeroTitle">Journal Revenue Overview</h2>
        <p className="highlightsHeroDescription">
          Keep track of confirmed publication payments and the latest activity
          from your journal in one place.
        </p>
      </div>

      <div className="highlightsSidebar">
        <div className="highlightsHeader">
          <h3>Confirmed Payments</h3>
        </div>

        <div className="highlightsSalesSection">
          <span className="highlightsSalesLabel">All-time verified revenue</span>
          <div className="highlightsSalesRow">
            <h2>{formatCurrency(revenue)}</h2>
            <span className="highlightsBadge">Live</span>
          </div>
        </div>

        <div className="highlightsDivider"></div>

        <div className="highlightsList">
          {loading && <p className="dashboardListMessage">Loading payments...</p>}

          {!loading && payments.length === 0 && (
            <p className="dashboardListMessage">No confirmed payments yet.</p>
          )}

          {payments.map((payment) => (
            <div className="highlightsListItem" key={payment._id}>
              <div className="highlightsLeft">
                <div className="highlightsIcon">
                  <FaReceipt />
                </div>
                <span>
                  {payment.paperId?.paperTitle || payment.transactionId}
                </span>
              </div>
              <div className="highlightsRight">
                <strong>{formatCurrency(payment.amount)}</strong>
                <span className="trendUp">
                  <FaMoneyBillWave />
                  {payment.paymentMethod}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
