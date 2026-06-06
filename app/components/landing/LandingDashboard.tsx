import React from "react";

export default function LandingDashboard() {
  return (
    <div className="dash">
      <div className="dash-bar">
        <div className="d dr" />
        <div className="d dy" />
        <div className="d dg" />
        <span style={{ marginLeft: 10, fontSize: "11.5px", color: "var(--muted)", fontFamily: "'Outfit',sans-serif", fontWeight: 600 }}>
          Salford Dashboard
        </span>
      </div>
      <div className="dash-body">
        <div className="mgrid">
          <div className="mc">
            <div className="ml">Active Employees</div>
            <div className="mv">
              248 <small>▲ 12%</small>
            </div>
          </div>
          <div className="mc">
            <div className="ml">Team Health Score</div>
            <div className="mv">
              86<small style={{ fontSize: 13, color: "var(--acc)" }}>/100</small>
            </div>
          </div>
        </div>
        <div className="chart">
          <div className="ch">
            <span className="ct">Wellness Trend — Q2</span>
            <span className="cb">+18% this month</span>
          </div>
          <div className="bars">
            <div className="bar" style={{ height: "32%" }} />
            <div className="bar ba2" style={{ height: "46%" }} />
            <div className="bar" style={{ height: "28%" }} />
            <div className="bar ba2" style={{ height: "60%" }} />
            <div className="bar ba" style={{ height: "72%" }} />
            <div className="bar" style={{ height: "42%" }} />
            <div className="bar ba" style={{ height: "85%" }} />
            <div className="bar ba" style={{ height: "79%" }} />
            <div className="bar ba2" style={{ height: "68%" }} />
            <div className="bar ba" style={{ height: "95%" }} />
          </div>
        </div>
        <div className="rlist">
          <div className="ri">
            <div className="rav">JS</div>
            <div>
              <div className="rn">James Sutton</div>
              <div className="rs">Annual checkup due</div>
            </div>
            <span className="rbdg bdue">Due Soon</span>
          </div>
          <div className="ri">
            <div className="rav">MC</div>
            <div>
              <div className="rn">Maya Chen</div>
              <div className="rs">All records updated</div>
            </div>
            <span className="rbdg bok">Healthy</span>
          </div>
          <div className="ri">
            <div className="rav">RP</div>
            <div>
              <div className="rn">Rohan Patel</div>
              <div className="rs">Stress indicator flagged</div>
            </div>
            <span className="rbdg bwn">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
