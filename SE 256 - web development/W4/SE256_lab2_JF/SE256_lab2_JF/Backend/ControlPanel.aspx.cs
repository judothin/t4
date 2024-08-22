using System;
using System.Web;
using System.Web.UI;

namespace SE256_lab2_JF.Backend
{
    public partial class ControlPanel : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["logged_in"] == null)
            {
                Response.Redirect("~/Backend/Default.aspx");
                return;
            }

            if ((bool)Session["logged_in"])
            {
                feedback_label.Text = $"Congrats, you succesfully logged in.";
            }
            else
            {
                Response.Redirect("~/Backend/Default.aspx");
            }
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            Session.Abandon();
            Response.Redirect("~/Backend/Default.aspx");
        }
    }
}
