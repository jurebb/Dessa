using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApp.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HistoryDecisions_Decisions_DecisionId",
                table: "HistoryDecisions");

            migrationBuilder.DropIndex(
                name: "IX_HistoryDecisions_DecisionId",
                table: "HistoryDecisions");

            migrationBuilder.DropColumn(
                name: "UrgentFlag",
                table: "Polls");

            migrationBuilder.DropColumn(
                name: "DecisionId",
                table: "HistoryDecisions");

            migrationBuilder.DropTable(
                name: "Decisions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Decisions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    FirstSumVotes = table.Column<int>(nullable: false),
                    FirstText = table.Column<string>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true),
                    SecondSumVotes = table.Column<int>(nullable: false),
                    SecondText = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    UrgentFlag = table.Column<bool>(nullable: false),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Decisions", x => x.Id);
                });

            migrationBuilder.AddColumn<bool>(
                name: "UrgentFlag",
                table: "Polls",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "DecisionId",
                table: "HistoryDecisions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HistoryDecisions_DecisionId",
                table: "HistoryDecisions",
                column: "DecisionId");

            migrationBuilder.AddForeignKey(
                name: "FK_HistoryDecisions_Decisions_DecisionId",
                table: "HistoryDecisions",
                column: "DecisionId",
                principalTable: "Decisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
