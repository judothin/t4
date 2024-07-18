using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace lesson1_webcalc_JF
{
    public partial class _Default : Page
    {

        public int intnum1;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btn1_Click(object sender, EventArgs e)
        {
            txtLCD.Text += "1";
        }

        protected void btn2_Click(object sender, EventArgs e)
        {
            txtLCD.Text += "2";
        }

        protected void btn3_Click(object sender, EventArgs e)
        {
            txtLCD.Text = "3";
        }

       

        
        protected void plsbtn_Click(object sender, EventArgs e)
        {
            Session["Num1"] = txtLCD.Text;
            intnum1 = Int32.Parse(txtLCD.Text);
            Session["Operand"] = "+";
            txtLCD.Text = "";
            membox.Text = "M";
            lastOpbox.Text = Session["Operand"].ToString();
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

                txtLCD.Text = result.ToString();
                membox.Text = "";
            }
        }

        protected void numbuttons_Click(object sender, EventArgs e) 
        {
            Button temp = (Button)sender;
            txtLCD.Text += temp.Text;
        }
    }
}