<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ControlPanel.aspx.cs" Inherits="week2_assignment.Backend.WebForm2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="BreakingNewsContent" runat="server">


</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <div>
        <h2>Control Panel</h2>

        <table>
            <tr>
                <td><a href="EbookMgr.aspx" runat="server">Add an Ebook</a></td>
            </tr>
            <tr>
                <td><asp:Button ID="btnLogout" runat="server" Text="Log out" OnClick="btnLogout_Click" /></td>
            </tr>
        </table>
    </div>

</asp:Content>
