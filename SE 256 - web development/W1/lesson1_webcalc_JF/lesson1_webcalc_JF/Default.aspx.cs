using System;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace lesson1_webcalc_JF
{
    public partial class _Default : Page
    {
        public int intnum1;
        private bool clearLCD;

        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        protected void btn1_Click(object sender, EventArgs e)
        {
            AddToOrReplaceLCD("1");
        }

        protected void btn2_Click(object sender, EventArgs e)
        {
            AddToOrReplaceLCD("2");
        }

        protected void btn3_Click(object sender, EventArgs e)
        {
            AddToOrReplaceLCD("3");
        }

        protected void plsbtn_Click(object sender, EventArgs e)
        {
            Session["Num1"] = txtLCD.Text;
            intnum1 = Int32.Parse(txtLCD.Text);
            Session["Operand"] = "+";
            txtLCD.Text = "";
            membox.Text = "M";
            lastOpbox.Text = Session["Operand"].ToString();
            clearLCD = true;
        }

        protected void eqlbtn_Click(object sender, EventArgs e)
        {
            if (Session["Num1"] != null && Session["Operand"] != null)
            {
                double Num1 = double.Parse(Session["Num1"].ToString());
                double Num2 = double.Parse(txtLCD.Text);
                string Operand = Session["Operand"].ToString();
                double result = 0;

                if (Operand == "+")
                {
                    result = Num1 + Num2;
                }
                if (Operand == "-")
                {
                    result = Num1 - Num2;
                }
                if (Operand == "*")
                {
                    result = Num1 * Num2;
                }
                if (Operand == "/")
                {
                    result = Num1 / Num2;
                }


                txtLCD.Text = result.ToString();
                membox.Text = "";
                clearLCD = true;
            }
        }

        protected void numbuttons_Click(object sender, EventArgs e)
        {
            Button temp = (Button)sender;
            AddToOrReplaceLCD(temp.Text);
        }

        protected void minbutton_Click(object sender, EventArgs e)
        {
            Session["Num1"] = txtLCD.Text;
            intnum1 = Int32.Parse(txtLCD.Text);
            Session["Operand"] = "-";
            txtLCD.Text = "";
            membox.Text = "M";
            lastOpbox.Text = Session["Operand"].ToString();
            clearLCD = true;
        }

        private void AddToOrReplaceLCD(string text) // method to add to or replace the text in the LCD
                                                    // (it did it without this method but it was messing up when i clicked different numbers in the first row)
        {
            if (clearLCD)
            {
                txtLCD.Text = text;
                clearLCD = false;
            }
            else
            {
                txtLCD.Text += text;
            }
        }

        protected void multbtn_Click(object sender, EventArgs e)
        {
            Session["Num1"] = txtLCD.Text;
            intnum1 = Int32.Parse(txtLCD.Text);
            Session["Operand"] = "*";
            txtLCD.Text = "";
            membox.Text = "M";
            lastOpbox.Text = Session["Operand"].ToString();
            clearLCD = true;
        }

        protected void divbtn_Click(object sender, EventArgs e)
        {
            Session["Num1"] = txtLCD.Text;
            intnum1 = Int32.Parse(txtLCD.Text);
            Session["Operand"] = "/";
            txtLCD.Text = "";
            membox.Text = "M";
            lastOpbox.Text = Session["Operand"].ToString();
            clearLCD = true;
        }
    }
}
