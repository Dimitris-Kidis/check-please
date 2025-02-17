﻿using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class Detail : IBaseEntity
    {
        public Guid Id { get; set; }
        public string DetailName { get; set; }
        public int? PricePerOne { get; set; }
        public int? Quantity { get; set; }
        public int? DetailsPrice { get; set; }
        public int RepairPrice { get; set; }
        public int TotalPrice { get; set; }
        public Guid RepairId { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public Repair Repair { get; set; }
    }
}
