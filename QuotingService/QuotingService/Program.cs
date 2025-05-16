using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();

var quotes = new ConcurrentDictionary<Guid, QuoteResult>();
var companies = new[] { "Assumption Life", "Medavie BlueCross", "Sunlife", "Manulife" };

app.MapPost("/api/quote", (QuoteRequest request) =>
{
    var id = Guid.NewGuid();
    var rng = new Random();

    var premiums = companies.Select(code => {
        decimal baseRate = 0.0025m + (decimal)(rng.NextDouble()) * 0.0025m; // between 0.25% and 0.5%
        decimal premium = Math.Round(baseRate * request.SumInsured, 2);
        return new PremiumQuote(code, premium);
    }).ToList();

    var result = new QuoteResult(id, request.Term, request.SumInsured, premiums);
    quotes.TryAdd(id, result);
    return Results.Ok(new { id });
});

app.MapGet("/api/quote/{id}", (Guid id) =>
{
    if (quotes.TryGetValue(id, out var quote))
    {
        return Results.Ok(quote);
    }
    return Results.NotFound();
});

app.Run();

record QuoteRequest(int Term, decimal SumInsured);
record PremiumQuote(string CompanyCode, decimal Premium);
record QuoteResult(Guid Id, int Term, decimal SumInsured, List<PremiumQuote> Premiums);
