import { useEffect, useRef } from "react";
import { useSearchParams } from 'react-router-dom';
import round from "lodash.round";
import random from "lodash.random";
import subDays from 'date-fns/subDays';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import { numberWithCommas } from "../../utils";

const UdemyInvoice = () => {
  const timeoutRef = useRef(null);
  let [searchParams] = useSearchParams();

  const price = round(parseFloat(searchParams.get("coursePrice")), 2).toFixed(2);
  const priceBeforeTax = round(parseFloat(price) / (1 + 18 / 100), 2).toFixed(2);
  const tax = round(parseFloat(price) - parseFloat(priceBeforeTax), 2).toFixed(2);
  const completionDate = parse(searchParams.get("date"), 'yyyy-MM-dd', new Date());
  const date = subDays(completionDate, 6);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      window.print();
    }, 1000);
  }, []);

  return (
    <section style={{ margin: '10px' }}>
      <div className="invoice-box" id="invoice-box">
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr className="top">
              <td colSpan="8">
                <table>
                  <tbody>
                    <tr>
                      <td className="bb">
                        <p className="images">
                          <img
                            alt="Logo"
                            className="logo"
                            src="https://s3-eu-west-1.amazonaws.com/img.assure.taxamo.com/18151/invoicing_logo.png"
                            style={{
                              maxHeight: "120px",
                              width: "auto",
                              maxWidth: "100%",
                            }}
                          />
                        </p>
                      </td>
                      <td className="bb">
                        <p className="innum">
                          <strong>ORIGINAL FOR RECIPIENT</strong>
                        </p>
                        <h1>TAX INVOICE</h1>
                        <p className="innum">
                          <strong>Invoice #:</strong> IN{format(date, "yyyy")}-{random(100000, 999999)}
                          <br />
                          <strong>Invoice date:</strong> {format(date, "dd/MM/yyyy")}
                          <br />
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td width="50%">
                        <p className="infoleft">
                          <strong>Supplier details:</strong>
                        </p>
                        <p className="innumleft">
                          Udemy India LLP
                          <br />
                          10th Floor, ResCowork 07, Tower B,
                          <br />
                          Unitech Cyber Park, Sector 39,
                          <br />
                          Gurgaon, Haryana, India, 122003
                          <br />
                          GSTIN: 06AAFFU9763M1ZE
                          <br />
                          PAN no. AAFFU9763M
                        </p>
                      </td>

                      <td width="50%">
                        <p className="inforight">
                          <strong>Recipient details:</strong>
                        </p>
                        <p className="innumright">
                          {searchParams.get("userName")}
                          <br />
                          {searchParams.get("email")}
                          <br />
                          National Capital Territory of Delhi, 07, DL, India
                          <br />
                          <br />
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            <tr className="heading">
              <td style={{ maxWidth: "180px" }}>Description</td>
              <td style={{ textAlign: "right" }}>HSN Code</td>
              <td style={{ textAlign: "right" }}>Quantity</td>
              <td style={{ textAlign: "right" }}>Taxable Value</td>
              <td style={{ textAlign: "right" }}>CGST (0%)</td>
              <td style={{ textAlign: "right" }}>SGST/UGST (0%)</td>
              <td style={{ textAlign: "right" }}>IGST (18%)</td>
              <td style={{ textAlign: "right" }}>Total Amount</td>
            </tr>
            <tr className="item">
              <td style={{ maxWidth: "180px" }}>
                {searchParams.get("courseName")}
              </td>
              <td style={{ textAlign: "right" }}>9984 33</td>
              <td style={{ textAlign: "right" }}>1.0</td>
              <td style={{ textAlign: "right" }}>{numberWithCommas(priceBeforeTax)}</td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}>{numberWithCommas(tax)}</td>
              <td style={{ textAlign: "right" }}>{numberWithCommas(price)}</td>
            </tr>

            <tr className="heading">
              <td style={{ maxWidth: "180px" }}>Total</td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}>{numberWithCommas(priceBeforeTax)}</td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}></td>
              <td style={{ textAlign: "right" }}>{numberWithCommas(tax)}</td>
              <td style={{ textAlign: "right" }}>INR {numberWithCommas(price)}</td>
            </tr>

            <tr>
              <td colSpan="8" align="right" className="sig-container">
                <p style={{ textAlign: "left" }}>
                  <em>
                    This is a system generated invoice and does not require a
                    signature or a digital signature
                  </em>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UdemyInvoice;
