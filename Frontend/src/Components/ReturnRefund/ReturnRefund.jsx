// ReturnRefund.jsx
import React from "react";
import "./ReturnRefund.css";

const ReturnRefund = () => {
  return (
    <div className="return-refund-wrapper">
      <div className="return-refund-container">
        {/* RETURN POLICY */}
        <section className="policy-section">
          <h1>RETURN POLICY (IJPASR)</h1>

          <p>
            International Journal of Pharmaceutical and Applied Science
            Research (IJPASR) is an online, peer-reviewed, open-access journal
            that provides digital publication services such as manuscript
            processing, peer review, editorial evaluation, formatting, and
            online publication.
          </p>

          <p>
            Since all journal services are intangible and provided
            electronically, there is no physical product shipped or delivered
            to authors or users. Therefore, the concept of “return” does not
            apply.
          </p>

          <h2>Non-Returnable Services</h2>

          <p>
            All services offered by IJPASR are strictly non-returnable,
            including but not limited to:
          </p>

          <ul>
            <li>Article Processing Charges (APC)</li>
            <li>Fast Track Processing Fees</li>
            <li>DOI charges (if applicable)</li>
            <li>
              Manuscript editing, formatting, and proofreading services
            </li>
            <li>Certificate or acceptance letter related services</li>
            <li>Any administrative or technical service fees</li>
          </ul>

          <p>
            Once an author submits a manuscript and completes the payment, the
            journal begins processing immediately. This includes administrative
            activities such as plagiarism checking, reviewer assignment,
            editorial assessment, and manuscript handling. Hence, services
            cannot be reversed or returned.
          </p>

          <h2>Acknowledgement</h2>

          <p>
            By making payment to IJPASR, the author agrees that the journal’s
            services have started and understands that the paid amount is not
            eligible for return.
          </p>
        </section>

        <hr />

        {/* REFUND POLICY */}
        <section className="policy-section">
          <h1>REFUND POLICY (IJPASR)</h1>

          <p>
            IJPASR maintains a transparent and strict refund policy to ensure
            fairness for authors and to maintain the operational workflow of
            the journal.
          </p>

          <h2>1. General Refund Policy</h2>

          <p>
            All payments made to IJPASR are generally non-refundable. This is
            because publication processing begins immediately after manuscript
            submission and payment confirmation.
          </p>

          <p>
            Refund is not guaranteed and is provided only in exceptional
            situations as described below.
          </p>

          <h2>2. Non-Refundable Payments</h2>

          <p>Refund will not be provided in the following cases:</p>

          <div className="sub-section">
            <h3>a) Manuscript Withdrawal by Author</h3>

            <p>
              If the author withdraws the manuscript after submission or during
              review/processing, the journal will not refund the amount, as
              administrative and editorial resources are already utilized.
            </p>
          </div>

          <div className="sub-section">
            <h3>b) Rejection of Manuscript</h3>

            <p>If the manuscript is rejected due to:</p>

            <ul>
              <li>Plagiarism,</li>
              <li>Unethical research,</li>
              <li>Poor quality content,</li>
              <li>Incomplete manuscript,</li>
              <li>Fake data or manipulated results,</li>
              <li>Violation of journal policies,</li>
            </ul>

            <p>Then the processing fee is non-refundable.</p>
          </div>

          <div className="sub-section">
            <h3>c) Author Delay / Failure to Respond</h3>

            <p>If the author fails to:</p>

            <ul>
              <li>submit revised manuscript on time,</li>
              <li>respond to editorial queries,</li>
              <li>complete required documentation,</li>
            </ul>

            <p>then no refund will be issued.</p>
          </div>

          <div className="sub-section">
            <h3>d) Article Already Published</h3>

            <p>
              Once the manuscript is published online (in current issue or in
              early access mode), no refund will be possible under any
              condition.
            </p>
          </div>

          <div className="sub-section">
            <h3>e) Acceptance Letter Issued</h3>

            <p>
              If the acceptance letter is issued after successful review, and
              the author later requests cancellation, refund will not be
              applicable.
            </p>
          </div>

          <div className="sub-section">
            <h3>f) Payment for Additional Services</h3>

            <p>Payments made for services like:</p>

            <ul>
              <li>Fast track processing,</li>
              <li>Certificate charges,</li>
              <li>Editing charges,</li>
              <li>DOI charges,</li>
            </ul>

            <p>are non-refundable once processing has started.</p>
          </div>

          <h2>3. Refund Allowed Only in Special Cases</h2>

          <p>
            Refund may be considered only in the following genuine situations:
          </p>

          <div className="sub-section">
            <h3>a) Duplicate Payment</h3>

            <p>
              If an author accidentally makes payment twice for the same
              manuscript, the extra amount may be refunded after verification.
            </p>
          </div>

          <div className="sub-section">
            <h3>b) Technical Payment Error</h3>

            <p>
              If payment is debited from the author’s bank account but not
              received by IJPASR due to technical failure, the author may
              request support for confirmation and resolution.
            </p>
          </div>

          <div className="sub-section">
            <h3>c) System Transaction Failure</h3>

            <p>
              If the payment is successfully deducted but submission
              confirmation is not received due to system error, refund may be
              considered after investigation.
            </p>
          </div>

          <h2>4. Refund Request Procedure</h2>

          <p>
            To request a refund (if applicable), the author must send an email
            request to the official IJPASR email address with:
          </p>

          <ul>
            <li>Full Author Name</li>
            <li>Manuscript ID (if generated)</li>
            <li>Payment Transaction ID</li>
            <li>Date of Payment</li>
            <li>Payment Proof (screenshot / receipt)</li>
            <li>Reason for refund request</li>
            <li>Bank details (if required for manual refund)</li>
          </ul>

          <p>
            Refund requests must be submitted within 7 working days from the
            date of payment.
          </p>

          <h2>5. Refund Approval</h2>

          <p>
            All refund requests are reviewed by the journal’s finance and
            editorial department. The final decision of refund approval will be
            taken by the Editor-in-Chief / Publisher and will be considered
            final.
          </p>

          <p>
            IJPASR reserves the right to accept or reject refund requests based
            on verification.
          </p>

          <h2>6. Refund Processing Time</h2>

          <p>
            If approved, refund will be processed within 7 to 15 working days
            depending upon:
          </p>

          <ul>
            <li>Bank Processing Time,</li>
            <li>Payment Gateway Policies,</li>
            <li>Transaction Verification.</li>
          </ul>

          <p>
            The refund will be credited to the original payment method whenever
            possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnRefund;