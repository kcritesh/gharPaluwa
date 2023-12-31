// eslint-disable-next-line import/prefer-default-export
export const orderConfirmationCustomerTemplate = `
          <!DOCTYPE html>
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Order Confirmation</h1>
        <p>Dear [Customer Name],</p>
        <p>Your order has been confirmed. Here are the details:</p>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            [ORDER_ITEMS]
          </tbody>
          <tfoot>
            <tr>
              <td colspan="1" style="text-align: left; text-transform: uppercase; "><strong>Nrs. [TOTAL IN WORDS] Only/-</strong></td>
              <td colspan="1" style="text-align: right;"><strong>Total:</strong></td>
              <td>[TOTAL]</td>
            </tr>
          </tfoot>
        </table>
        <p>Thank you for shopping with us!</p>
        <p>Sincerely,<br>Gharpaluwa</p>
      </body>
      </html>
`;
