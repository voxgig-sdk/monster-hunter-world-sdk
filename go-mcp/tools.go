package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"
)

// ListArgs is what an agent sends to monster-hunter-world_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: ailment | armor | armor_set | charm | decoration | event | item | location | monster | motion_value | skill | weapon"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to monster-hunter-world_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: ailment | armor | armor_set | charm | decoration | event | item | location | monster | motion_value | skill | weapon"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.MonsterHunterWorldSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "monster-hunter-world_list",
		Description: "List records from MonsterHunterWorld. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("ailment", "armor", "armor_set", "charm", "decoration", "event", "item", "location", "monster", "motion_value", "skill", "weapon"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "monster-hunter-world_load",
		Description: "Load one record from MonsterHunterWorld. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("ailment", "armor", "armor_set", "charm", "decoration", "event", "item", "location", "monster", "motion_value", "skill", "weapon"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.MonsterHunterWorldSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.MonsterHunterWorldSDK, name string) (sdk.MonsterHunterWorldEntity, error) {
	switch strings.ToLower(name) {
	case "ailment":
		return client.Ailment(nil), nil
	case "armor":
		return client.Armor(nil), nil
	case "armor_set":
		return client.ArmorSet(nil), nil
	case "charm":
		return client.Charm(nil), nil
	case "decoration":
		return client.Decoration(nil), nil
	case "event":
		return client.Event(nil), nil
	case "item":
		return client.Item(nil), nil
	case "location":
		return client.Location(nil), nil
	case "monster":
		return client.Monster(nil), nil
	case "motion_value":
		return client.MotionValue(nil), nil
	case "skill":
		return client.Skill(nil), nil
	case "weapon":
		return client.Weapon(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
