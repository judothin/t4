<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="lesson1_webcalc_JF._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div style =" "margin-top:20px;">
        <table>
            <tr>
                <td colspan="4">
                    <asp:TextBox ID="txtLCD" runat="server" Columns="20" />
                    <td colspan="3"> <asp:TextBox ID="membox" Columns="2" runat="server" /> </td>
                </td>
            </tr>
            <tr>
                <td><asp:Button ID="btn1" Text="1" runat="server" OnClick="btn1_Click" /></td>
                <td><asp:Button ID="btn2" Text="2" runat="server" OnClick="btn2_Click" /></td>
                <td><asp:Button ID="btn3" Text="3" runat="server" OnClick="btn3_Click" /></td>
                <td><asp:Button ID="eqlbtn" Text="=" runat="server" OnClick="eqlbtn_Click" /></td>
                <td colspan="3"> <asp:TextBox ID="lastOpbox" Columns="2" runat="server" /> </td>
                
            </tr>
            <tr>
                <td><asp:Button ID="btn4" Text="4" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="btn5" Text="5" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="btn6" Text="6" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="plsbtn" Text="+" runat="server" OnClick="plsbtn_Click" /></td>
            </tr>
                <td><asp:Button ID="btn7" Text="7" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="btn8" Text="8" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="btn9" Text="9" runat="server" OnClick="numbuttons_Click" /></td>
                <td><asp:Button ID="minbutton" Text="-" runat="server" OnClick="plsbtn_Click" /></td>
            <tr>
                <td></td>
            </tr>

        </table>
    </div>

</asp:Content>
