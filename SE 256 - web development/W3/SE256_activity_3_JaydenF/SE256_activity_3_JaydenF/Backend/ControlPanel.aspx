<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="ControlPanel.aspx.cs" Inherits="SE256_activity_3_JaydenF.Backend.ControlPanel" %>

<asp:Content ID="Content1" ContentPlaceHolderID="BreakingNewsContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div>
        <h2>Control Panel</h2>
        <asp:Label ID="feedback_label" runat="server"/>
        <table>
            <tr>
                <td><a href="EbookManager.aspx" runat="server">Add a New Book</a></td>
            </tr>
            <tr>
                <td><a href="BookSearch.aspx" runat="server">Search a Book</a></td>
            </tr>
            <tr>
                <td><asp:Button ID="logout_button" runat="server" Text="Log Out" OnClick="logout_button_click" /></td>
            </tr>
        </table>
    </div>
</asp:Content>
